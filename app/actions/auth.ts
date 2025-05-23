"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { hashPassword } from "@/lib/utils/password"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createWallet } from "@/lib/blockchain/server"
import { encrypt } from "@/utils/encryption"

export type RegisterResult = {
  success: boolean
  message: string
  redirectTo?: string
}

export type AuthResult = {
  success: boolean
  message: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export async function registerUser(formData: FormData): Promise<RegisterResult> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const password = formData.get("password") as string

  if (!name || !email || !phone || !password) {
    return {
      success: false,
      message: "All fields are required",
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  try {
    const supabase = createServerSupabaseClient()
    
    const wallet = createWallet()
    console.log("Generated wallet:", wallet)
    const encryptedPrivateKey = encrypt(wallet.privateKey)

    const hashedPassword = hashPassword(password)

    const { data: existingUser } = await supabase.from("users").select("email").eq("email", email).single()

    if (existingUser) {
      return {
        success: false,
        message: "A user with this email already exists",
      }
    }

    const { error, data } = await supabase
      .from("users")
      .insert({
        name,
        email,
        phone,
        password: hashedPassword,
        private_key: encryptedPrivateKey,
        wallet_address: wallet.account.address,
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error registering user:", error)
      return {
        success: false,
        message: "Failed to register user. Please try again.",
      }
    }

    const sessionId = crypto.randomUUID()
    const cookieStore = await cookies()

    await supabase.from("sessions").insert({
      id: sessionId,
      user_id: data.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), })

    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, path: "/",
    })

    return {
      success: true,
      message: "Registration successful!",
      redirectTo: "/collection",
    }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  try {
    const supabase = createServerSupabaseClient()
    const hashedPassword = hashPassword(password)

    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, email, password")
      .eq("email", email)
      .single()

    if (error || !user) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    if (user.password !== hashedPassword) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    const sessionId = crypto.randomUUID()
    const cookieStore = await cookies()

    await supabase.from("sessions").insert({
      id: sessionId,
      user_id: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), })

    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, path: "/",
    })

    return {
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  } catch (error) {
    console.error("Error signing in:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session_id")?.value

    if (!sessionId) {
      return null
    }

    const supabase = createServerSupabaseClient()

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("user_id, expires_at")
      .eq("id", sessionId)
      .single()

    if (sessionError || !session) {
      return null
    }

    if (new Date(session.expires_at) < new Date()) {
      await supabase.from("sessions").delete().eq("id", sessionId)

      cookieStore.delete("session_id")
      return null
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, name, email, wallet_address")
      .eq("id", session.user_id)
      .single()

    if (userError || !user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      walletAddress: user.wallet_address,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session_id")?.value

    if (sessionId) {
      const supabase = createServerSupabaseClient()

      await supabase.from("sessions").delete().eq("id", sessionId)

      cookieStore.delete("session_id")
    }

    return { success: true }
  } catch (error) {
    console.error("Error signing out:", error)
    return { success: false, error: "Failed to sign out" }
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/signin")
  }

  return user
}

"use server"

import { createServerSupabaseClient } from "./server"
import { hashPassword } from "../utils/password"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type AuthResult = {
  success: boolean
  message: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  try {
    const supabase = createServerSupabaseClient()
    const hashedPassword = hashPassword(password)

    // Query the users table to find a matching user
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

    // Check if the password matches
    if (user.password !== hashedPassword) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    // Create a session cookie
    const sessionId = crypto.randomUUID()
    const cookieStore = await cookies()

    // Store session in Supabase
    await supabase.from("sessions").insert({
      id: sessionId,
      user_id: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    })

    // Set the session cookie
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
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

    // Get the session
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("user_id, expires_at")
      .eq("id", sessionId)
      .single()

    if (sessionError || !session) {
      return null
    }

    // Check if session is expired
    if (new Date(session.expires_at) < new Date()) {
      // Delete expired session
      await supabase.from("sessions").delete().eq("id", sessionId)

      cookieStore.delete("session_id")
      return null
    }

    // Get the user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, name, email")
      .eq("id", session.user_id)
      .single()

    if (userError || !user) {
      return null
    }

    return user
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

      // Delete the session from the database
      await supabase.from("sessions").delete().eq("id", sessionId)

      // Delete the cookie
      cookieStore.delete("session_id")
    }
  } catch (error) {
    console.error("Error signing out:", error)
  }

  // Redirect to home page
  redirect("/")
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/signin")
  }

  return user
}

"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { hashPassword } from "@/lib/utils/password"

export type RegisterResult = {
  success: boolean
  message: string
  redirectTo?: string
}

export async function registerUser(formData: FormData): Promise<RegisterResult> {
  // Validate form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const password = formData.get("password") as string

  // Check if all fields are provided
  if (!name || !email || !phone || !password) {
    return {
      success: false,
      message: "All fields are required",
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  try {
    const supabase = createServerSupabaseClient()

    // Hash the password before storing
    const hashedPassword = hashPassword(password)

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("email").eq("email", email).single()

    if (existingUser) {
      return {
        success: false,
        message: "A user with this email already exists",
      }
    }

    // Insert the new user
    const { error } = await supabase.from("users").insert({
      name,
      email,
      phone,
      password: hashedPassword,
    })

    if (error) {
      console.error("Error registering user:", error)
      return {
        success: false,
        message: "Failed to register user. Please try again.",
      }
    }

    // Create auth user (optional, if you want to use Supabase Auth)
    // This would require additional setup with Supabase Auth

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

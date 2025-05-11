"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerUser } from "../actions/auth"
import { LoadingAnimation } from "@/components/loading-animation"
import { Logo } from "@/components/logo"

export default function CreateAccountScreen() {
  const router = useRouter()
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormError(null)

    try {
      const result = await registerUser(formData)

      if (result.success) {
        // If registration was successful and we have a redirect URL
        if (result.redirectTo) {
          router.push(result.redirectTo)
        }
      } else {
        // If there was an error, display it
        setFormError(result.message)
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.")
      console.error("Registration error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050810] text-white">
      {/* Logo and App Name */}
      <div className="flex items-center justify-center mt-8 mb-4">
        <Logo size="sm" />
        <span className="text-xl font-semibold">Legit</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-8 pt-4 pb-8">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Create
          <br />
          account
        </h1>

        {formError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md mb-6">
            {formError}
          </div>
        )}

        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#121620] p-8 rounded-xl flex flex-col items-center">
              <LoadingAnimation size="lg" color="#4169e1" />
              <p className="mt-4 text-white font-medium">Creating your account...</p>
            </div>
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your e-mail"
              className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Enter your phone"
              className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium mt-6 disabled:opacity-70 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Registering</span>
                <span className="flex space-x-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
                    .
                  </span>
                  <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
                    .
                  </span>
                </span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-auto text-center">
          <p className="text-white mb-2">Already have an account?</p>
          <Link href="/signin" className="text-[#4169e1] font-medium">
            Sign in
          </Link>
        </div>

        {/* Home Indicator */}
        <div className="w-32 h-1 bg-white rounded-full mx-auto mt-8"></div>
      </div>
    </div>
  )
}

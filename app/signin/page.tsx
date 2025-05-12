"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "../actions/auth"
import { Logo } from "@/components/logo"
import { WatchLoadingAnimation } from "@/components/watch-loading-animation"

export default function SignInScreen() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn(formData)

      if (result.success) {
        router.push("/collection")
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Error signing in:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050810] text-white">
      {/* Logo and App Name */}
      <div className="flex items-center justify-center mt-8 mb-4">
        <Logo size="sm" />
        <span className="text-xl font-semibold">Legit</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-8 pt-4 pb-8">
        {/* Hoodie Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <Image src="/images/hoodie.png" alt="White hoodie" fill style={{ objectFit: "contain" }} priority />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-10 text-center">Sign in</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md mb-6">{error}</div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#121620] p-8 rounded-xl flex flex-col items-center">
              <WatchLoadingAnimation size="lg" color="#4169e1" text="Verifying credentials" />
            </div>
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your e-mail"
              required
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
              placeholder="Enter your password"
              required
              className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium mt-6 disabled:opacity-70 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <span className="mr-2">Signing in</span>
                <span className="flex space-x-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
                    .
                  </span>
                  <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
                    .
                  </span>
                </span>
              </div>
            ) : (
              "Enter"
            )}
          </button>
        </form>

        {/* Removed home indicator */}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Paperclip } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerUser } from "../actions/auth"

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
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="text-white font-medium">9:41</div>
        <div className="flex items-center gap-1">
          <div className="flex h-4 items-end space-x-0.5">
            <div className="w-1 h-1.5 bg-white rounded-sm"></div>
            <div className="w-1 h-2 bg-white rounded-sm"></div>
            <div className="w-1 h-2.5 bg-white rounded-sm"></div>
            <div className="w-1 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="ml-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.5 8.56722C1.5 15 6.5 20 12.9328 20C14.25 20 15.5 19.75 16.6664 19.3056C17.0328 19.1667 17.2328 18.7778 17.0939 18.4111L15.7495 15.5C15.6384 15.2056 15.3439 15 15.0217 15H12.9328C10.8328 15 9.00006 13.3 9.00006 11.2V9.11111C9.00006 8.78889 8.79451 8.49444 8.50006 8.38333L5.58895 7.03889C5.22228 6.9 4.83339 7.1 4.69451 7.46667C4.25006 8.63333 4.00006 9.88333 4.00006 11.2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.5 12C22.5 6.47778 18.0222 2 12.5 2C11.1834 2 9.93345 2.25 8.76678 2.69444C8.40012 2.83333 8.20012 3.22222 8.33901 3.58889L9.68345 6.5C9.79456 6.79444 10.089 7 10.4112 7H12.5C14.6 7 16.4334 8.7 16.4334 10.8V12.8889C16.4334 13.2111 16.639 13.5056 16.9334 13.6167L19.8445 14.9611C20.2112 15.1 20.6001 14.9 20.739 14.5333C21.1834 13.3667 21.4334 12.1167 21.4334 10.8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="ml-1">
            <div className="h-4 w-6 rounded-sm border border-white relative">
              <div className="absolute right-0 top-0 h-3 w-4 bg-white translate-x-[-1px] translate-y-[1px] rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo and App Name */}
      <div className="flex items-center justify-center mt-8 mb-4">
        <Paperclip className="h-6 w-6 text-white mr-2" />
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
            className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium mt-6 disabled:opacity-70"
          >
            {isSubmitting ? "Registering..." : "Register"}
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

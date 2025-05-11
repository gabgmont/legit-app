"use client"

import { useState } from "react"
import { ArrowLeft, QrCode } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"

export default function VerifyContent() {
  const router = useRouter()
  const [verificationMethod, setVerificationMethod] = useState<string | null>(null)

  const handleVerify = () => {
    if (verificationMethod === "qr") {
      router.push("/scanner")
    } else if (verificationMethod === "nfc") {
      // Handle NFC scanning (would be implemented in a real app)
      alert("NFC scanning would start here")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050810] text-white">
      {/* Header with Navigation */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/collection">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <div className="flex items-center">
          <Logo size="sm" />
          <span className="text-xl font-semibold">Legit</span>
        </div>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Authenticate</h1>
        <p className="text-center text-gray-300 mb-10">Choose an authentication method</p>

        {/* QR Code Option */}
        <button
          className={`w-full border ${verificationMethod === "qr" ? "border-[#4169e1] bg-[#4169e1]/10" : "border-[#3859d4]"} rounded-xl p-6 flex flex-col items-center mb-6`}
          onClick={() => setVerificationMethod("qr")}
        >
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <QrCode size={120} className="text-[#99a1b9]" />
          </div>
          <span className="text-xl">QR code</span>
        </button>

        <div className="text-lg mb-6 text-center">or</div>

        {/* NFC Option */}
        <button
          className={`w-full border ${verificationMethod === "nfc" ? "border-[#4169e1] bg-[#4169e1]/10" : "border-[#3859d4]"} rounded-xl p-6 flex flex-col items-center mb-auto`}
          onClick={() => setVerificationMethod("nfc")}
        >
          <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full border-4 border-[#99a1b9]">
            <div className="flex flex-col items-center">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12"
                  stroke="#99a1b9"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12"
                  stroke="#99a1b9"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12"
                  stroke="#99a1b9"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[#99a1b9] text-4xl font-bold mt-1">NFC</span>
            </div>
          </div>
          <span className="text-xl">NFC tag</span>
        </button>

        {/* Verify Button */}
        {verificationMethod && (
          <button onClick={handleVerify} className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium mt-6">
            Verify
          </button>
        )}

        {/* Home Indicator */}
        <div className="w-32 h-1 bg-white rounded-full mx-auto mt-8"></div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { QRScanner } from "@/components/qr-scanner"
import { LoadingAnimation } from "@/components/loading-animation"

// Define the QR code payload structure
interface QRCodePayload {
  id: string
  nonce: number
}

export default function ScannerContent() {
  const router = useRouter()
  const [scanComplete, setScanComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleScan = (data: string) => {
    setIsProcessing(true)

    try {
      // Try to decode the base64 data
      const decodedJson = atob(data)
      const payload = JSON.parse(decodedJson) as QRCodePayload

      // Validate the payload data
      if (!payload.id || typeof payload.nonce !== "number") {
        throw new Error("Invalid QR code payload format")
      }

      // Store the payload data in session storage
      sessionStorage.setItem("scannedProductPayload", JSON.stringify(payload))

      // Set scan as complete
      setScanComplete(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/product-register")
      }, 1000)
    } catch (err) {
      console.error("Error processing QR code data:", err)
      setError("Invalid QR code format. Please scan a valid product QR code.")
      setIsProcessing(false)
    }
  }

  const handleScanError = (errorMessage: string) => {
    setError(`Scanner error: ${errorMessage}`)
    setIsProcessing(false)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050810] text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-12">Scan QR code</h1>

        {/* QR Scanner */}
        {!scanComplete && !isProcessing && <QRScanner onScan={handleScan} onError={handleScanError} />}

        {/* Processing State */}
        {isProcessing && !scanComplete && (
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingAnimation size="lg" color="#4169e1" />
            <p className="mt-4 text-white">Processing QR code...</p>
          </div>
        )}

        {/* Success State */}
        {scanComplete && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-green-500 rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl text-white">QR Code Detected!</p>
            <p className="text-gray-400 mt-2">Redirecting to registration...</p>
          </div>
        )}

        {/* Error Message */}
        {error && !scanComplete && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md mb-6 w-full">
            {error}
          </div>
        )}

        {/* Cancel Button */}
        <button onClick={handleCancel} className="w-full border border-white rounded-md py-3 mt-auto mb-4">
          Cancel
        </button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { generateProductAuthQRData } from "@/utils/qr-generator"
import QRCode from "qrcode.react"

export default function QRGeneratorPage() {
  const [productId, setProductId] = useState("688f027d-2389-4f46-9464-43591768ecb1")
  const [nonce, setNonce] = useState(1)
  const [qrValue, setQrValue] = useState("")

  const handleGenerateQR = () => {
    const qrData = generateProductAuthQRData(productId, nonce)
    setQrValue(qrData)
  }

  return (
    <div className="min-h-screen bg-[#050810] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">QR Code Generator (For Testing)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Product ID (UUID)</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full bg-[#121620] border border-gray-700 rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Nonce (Number)</label>
            <input
              type="number"
              value={nonce}
              onChange={(e) => setNonce(Number.parseInt(e.target.value))}
              className="w-full bg-[#121620] border border-gray-700 rounded p-2"
            />
          </div>

          <button onClick={handleGenerateQR} className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium">
            Generate QR Code
          </button>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg">
          {qrValue ? (
            <>
              <QRCode value={qrValue} size={256} level="H" />
              <p className="mt-4 text-black text-sm">Scan this QR code with the app</p>
              <p className="mt-2 text-black text-xs break-all">
                <strong>Data:</strong> {qrValue}
              </p>
            </>
          ) : (
            <p className="text-gray-500">Fill in the form and click Generate</p>
          )}
        </div>
      </div>
    </div>
  )
}

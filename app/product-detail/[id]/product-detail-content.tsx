"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Download } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { ProductImage } from "@/components/product-image"
import { getRarityColor } from "@/utils/rarity"
import type { ProductCard } from "@/types/product"
import { generateProductAuthQRData } from "@/utils/qr-generator"

interface User {
  id: string
  name: string
  email: string
}

export default function ProductDetailContent({ user, product }: { user: User; product: ProductCard }) {
  const router = useRouter()
  const [nonce, setNonce] = useState<number>(1)
  const [qrCodeData, setQrCodeData] = useState<string>("")

  // Generate QR code data when nonce changes
  useEffect(() => {
    if (product.id) {
      const data = generateProductAuthQRData(product.id, nonce)
      setQrCodeData(data)
    }
  }, [product.id, nonce])

  const handleDownloadQRCode = () => {
    const canvas = document.getElementById("product-qr-code") as HTMLCanvasElement
    if (!canvas) return

    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `${product.name}-qrcode-${nonce}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* Header */}
      <header className="flex items-center justify-start px-6 py-4 border-b border-gray-800">
        <div className="flex items-center mr-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center mr-3">
            <span className="text-white font-semibold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <span className="text-xl font-semibold">{user.name}</span>
        </div>
        <svg width="1" height="24" viewBox="0 0 1 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.5" y1="24" x2="0.5" stroke="white" />
        </svg>
        <Link href="/product-list" className="ml-4 cursor-pointer hover:opacity-80 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z" fill="#E3E3E3" />
          </svg>
        </Link>
        <div className="text-xl ml-4 font-medium">Product / {product.id?.substring(0, 7)}</div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-6 py-8">
        {/* Product Image */}
        <div className="relative w-64 h-64 mb-8">
          <ProductImage src={product.image} alt={product.name} priority />
        </div>

        {/* Product Information */}
        <div className="w-full max-w-md space-y-4 mb-8">
          <div className="border border-[#3859d4] rounded-md p-3">
            <p className="text-white text-lg">{product.name}</p>
          </div>

          <div className="border border-[#3859d4] rounded-md p-3">
            <p className="text-white text-lg">{product.brand || "Unknown Brand"}</p>
          </div>

          <div className="border border-[#3859d4] rounded-md p-3">
            <p className="text-white text-lg">{product.total} available</p>
          </div>

          <div className="border border-[#3859d4] rounded-md p-3">
            <p className={`text-lg ${getRarityColor(product.rarity)}`}>{product.rarity} item</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="border border-[#3859d4] rounded-md p-4 mb-8 flex justify-center w-full max-w-md">
          <QRCodeCanvas
            id="product-qr-code"
            value={qrCodeData}
            size={256}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        {/* Nonce Input */}
        <div className="w-full max-w-md mb-6">
          <label htmlFor="nonce" className="block text-lg mb-2">
            nonce
          </label>
          <input
            id="nonce"
            type="number"
            min="1"
            value={nonce}
            onChange={(e) => setNonce(Number.parseInt(e.target.value) || 1)}
            className="w-full bg-transparent border-b border-gray-700 pb-2 text-white focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Product nonce</p>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadQRCode}
          className="bg-[#4169e1] text-white px-6 py-3 rounded-md font-medium flex items-center justify-center w-full max-w-md"
        >
          <Download className="h-5 w-5 mr-2" />
          Download qr code
        </button>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { generateProductQRData } from "@/utils/qr-generator"
import type { ProductCard, RarityType } from "@/types/product"
import QRCode from "qrcode.react"

export default function QRGeneratorPage() {
  const [productName, setProductName] = useState("Limited Edition Hoodie")
  const [productImage, setProductImage] = useState("/images/hoodie.png")
  const [productNumber, setProductNumber] = useState(42)
  const [productTotal, setProductTotal] = useState(100)
  const [productRarity, setProductRarity] = useState<RarityType>("Rare")
  const [qrValue, setQrValue] = useState("")

  const handleGenerateQR = () => {
    const product: ProductCard = {
      name: productName,
      image: productImage,
      number: productNumber,
      total: productTotal,
      rarity: productRarity as RarityType,
    }

    const qrData = generateProductQRData(product)
    setQrValue(qrData)
  }

  return (
    <div className="min-h-screen bg-[#050810] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">QR Code Generator (For Testing)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-[#121620] border border-gray-700 rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Image Path</label>
            <input
              type="text"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              className="w-full bg-[#121620] border border-gray-700 rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Number</label>
            <input
              type="number"
              value={productNumber}
              onChange={(e) => setProductNumber(Number.parseInt(e.target.value))}
              className="w-full bg-[#121620] border border-gray-700 rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Total</label>
            <input
              type="number"
              value={productTotal}
              onChange={(e) => setProductTotal(Number.parseInt(e.target.value))}
              className="w-full bg-[#121620] border border-gray-700 rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Rarity</label>
            <select
              value={productRarity}
              onChange={(e) => setProductRarity(e.target.value as RarityType)}
              className="w-full bg-[#121620] border border-gray-700 rounded p-2"
            >
              <option value="Common">Common</option>
              <option value="Rare">Rare</option>
              <option value="Epic">Epic</option>
              <option value="Legendary">Legendary</option>
            </select>
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
            </>
          ) : (
            <p className="text-gray-500">Fill in the form and click Generate</p>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ProductCard } from "@/types/product"
import { fetchProductById, registerProductForUser, updateProduct } from "../../actions/product"
import { LoadingAnimation } from "@/components/loading-animation"
import { ProductImage } from "@/components/product-image"
import { getRarityColor } from "@/utils/rarity"
import { mint } from "@/lib/blockchain/contracts/legit-contract"
import { walletClient } from "@/lib/blockchain/client"

interface QRCodePayload {
  id: string
  nonce: number
}

export default function ProductRegistrationContent() {
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)
  const [productData, setProductData] = useState<ProductCard | null>(null)
  const [qrPayload, setQrPayload] = useState<QRCodePayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const scannedProductPayload = sessionStorage.getItem("scannedProductPayload")

      if (scannedProductPayload) {
        const payload = JSON.parse(scannedProductPayload) as QRCodePayload
        setQrPayload(payload)

        fetchProductById(payload.id)
          .then((product) => {
            if (product) {
              setProductData({
                ...product,
                nonce: payload.nonce,
              })
            } else {
              setError("Product not found. Please scan a valid QR code.")
            }
          })
          .catch((err) => {
            console.error("Error fetching product:", err)
            setError("Failed to load product data. Please try again.")
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        setError("No product data found. Please scan a QR code first.")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Error parsing product payload:", err)
      setError("Invalid product data format")
      setIsLoading(false)
    }
  }, [])

  const handleRegister = async () => {
    if (!productData || !qrPayload) {
      setError("No product data to register")
      return
    }

    setIsRegistering(true)
    setError(null)

    try {
      const txHash = await mint(walletClient, qrPayload.id, qrPayload.nonce)
      const result = await registerProductForUser(qrPayload.id, qrPayload.nonce, txHash)

      if (result.success) {
        const txHash = await mint(walletClient, qrPayload.id, qrPayload.nonce)
        const updateResult = await updateProduct(qrPayload.id, txHash)

        sessionStorage.setItem("registeredProduct", JSON.stringify(productData))
        sessionStorage.removeItem("scannedProductPayload")
        router.push("/product-register/success")

      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error("Error registering product:", err)
      setError("Failed to register product. Please try again.")
    } finally {
      setIsRegistering(false)
    }
  }

  const handleCancel = () => {
    sessionStorage.removeItem("scannedProductPayload")
    router.back()
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#050810] text-white items-center justify-center">
        <LoadingAnimation size="lg" color="#4169e1" />
        <p className="mt-4">Loading product data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050810] text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-12">Registration</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md mb-6 w-full">
            {error}
          </div>
        )}

        {productData && (
          <>
            {/* Product Image */}
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64">
                <ProductImage src={productData.image} alt={productData.name || "Product"} priority />
              </div>
            </div>

            {/* Product Information */}
            <div className="text-center mb-auto">
              <h2 className="text-2xl font-semibold mb-2">{productData.name}</h2>
              {productData.brand && <p className="text-gray-300 mb-2">Brand: {productData.brand}</p>}
              <p className={`font-medium ${getRarityColor(productData.rarity)}`}>{productData.rarity} item</p>

              {/* Display Nonce */}
              <div className="mt-4 p-3 bg-[#121620] rounded-md">
                <p className="text-gray-300">
                  #{productData.nonce} out of {productData.total}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-4 mt-6">
          <button
            onClick={handleRegister}
            disabled={isRegistering || !productData}
            className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium disabled:opacity-70 flex items-center justify-center"
          >
            {isRegistering ? (
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

          <button onClick={handleCancel} className="w-full border border-white rounded-md py-3">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ProductCard } from "@/types/product"
import { registerProduct } from "../actions/product"
import { LoadingAnimation } from "@/components/loading-animation"
import { ProductImage } from "@/components/product-image"
import { getRarityColor } from "@/utils/rarity"

export default function ProductRegistrationContent() {
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)
  const [productData, setProductData] = useState<ProductCard | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get the product data from session storage
    try {
      const scannedProductBase64 = sessionStorage.getItem("scannedProduct")

      if (scannedProductBase64) {
        const productJson = atob(scannedProductBase64)
        const product = JSON.parse(productJson) as ProductCard
        setProductData(product)
      } else {
        setError("No product data found. Please scan a QR code first.")
      }
    } catch (err) {
      console.error("Error parsing product data:", err)
      setError("Invalid product data format")
    }
  }, [])

  const handleRegister = async () => {
    if (!productData) {
      setError("No product data to register")
      return
    }

    setIsRegistering(true)
    setError(null)

    try {
      const result = await registerProduct(productData)

      if (result.success) {
        // Store the registered product data for the success page
        sessionStorage.setItem("registeredProduct", JSON.stringify(productData))

        // Clear the scanned product data
        sessionStorage.removeItem("scannedProduct")

        // Redirect to success page
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
    // Clear the session storage
    sessionStorage.removeItem("scannedProduct")
    router.back()
  }

  if (!productData && !error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#050810] text-white items-center justify-center">
        <LoadingAnimation size="lg" color="#4169e1" />
        <p className="mt-4">Loading product data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050810] text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-8">
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
              <p className="text-gray-300 mb-2">
                {productData.number} out of {productData.total}
              </p>
              <p className={`font-medium ${getRarityColor(productData.rarity)}`}>{productData.rarity} item</p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-4">
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

        {/* Home Indicator */}
        <div className="w-32 h-1 bg-white rounded-full mt-8"></div>
      </div>
    </div>
  )
}

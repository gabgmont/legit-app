"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { ProductImage } from "@/components/product-image"
import type { ProductCard } from "@/types/product"

export default function RegistrationSuccessContent() {
  const router = useRouter()
  const [productData, setProductData] = useState<ProductCard | null>(null)

  useEffect(() => {
    // Get the registered product data from session storage
    try {
      const registeredProductJson = sessionStorage.getItem("registeredProduct")

      if (registeredProductJson) {
        const product = JSON.parse(registeredProductJson) as ProductCard
        setProductData(product)
      }
    } catch (err) {
      console.error("Error parsing registered product data:", err)
    }
  }, [])

  const handleGoBack = () => {
    // Clear the session storage before navigating
    sessionStorage.removeItem("registeredProduct")

    // Go back to collection page
    router.push("/collection")
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050810] text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4 pb-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-12">Registration</h1>

        {/* Product Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            <ProductImage
              src={productData?.image || "/images/hoodie.png"}
              alt={productData?.name || "Registered product"}
              priority
            />
          </div>
        </div>

        {/* Product Name (if available) */}
        {productData?.name && <h2 className="text-2xl font-semibold mb-4 text-center">{productData.name}</h2>}

        {/* Display Nonce */}
        {productData?.nonce !== undefined && productData?.total !== undefined && (
          <div className="mb-6 p-3 bg-[#121620] rounded-md">
            <p className="text-gray-300">
              #{productData.nonce} out of {productData.total}
            </p>
          </div>
        )}

        {/* Success Checkmark */}
        <div className="flex justify-center items-center w-16 h-16 rounded-full bg-[#99a1b9]/20 mb-auto">
          <Check className="h-8 w-8 text-[#99a1b9]" />
        </div>

        {/* Go Back Button */}
        <button onClick={handleGoBack} className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium mt-8 mb-4">
          Go back
        </button>
      </div>
    </div>
  )
}

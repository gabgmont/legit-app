"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getProductById } from "@/app/actions/product"
import type { ProductCard } from "@/types/product"
import { LoadingAnimation } from "@/components/loading-animation"
import { ProductImage } from "@/components/product-image"
import { getRarityColor } from "@/utils/rarity"

export default function ProductDetailContent({ id }: { id: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<ProductCard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getProductById(id)

        if (productData) {
          setProduct(productData)
        } else {
          setError("Product not found or you don't have permission to view it")
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleGoBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#050810] text-white items-center justify-center">
        <LoadingAnimation size="lg" color="#4169e1" />
        <p className="mt-4">Loading product details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#050810] text-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <p className="text-red-500 mb-6">{error || "Product not found"}</p>
          <button onClick={handleGoBack} className="px-4 py-2 bg-[#4169e1] rounded-md">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050810] text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-8">
        {/* Product Image */}
        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64">
            <ProductImage src={product.image} alt={product.name} priority />
          </div>
        </div>

        {/* Product Information */}
        <div className="w-full space-y-4 mb-auto">
          <div className="border border-[#3859d4] rounded-md p-3">
            <p className="text-white text-lg">{product.name}</p>
          </div>

          <div className="border border-[#3859d4] rounded-md p-3">
            <p className="text-white text-lg">
              {product.number} out of {product.total}
            </p>
          </div>

          <div className="border border-[#3859d4] rounded-md p-3">
            <p className={`text-lg font-medium ${getRarityColor(product.rarity)}`}>{product.rarity} item</p>
          </div>

          <div className="border border-[#3859d4] rounded-md p-3">
            <p className="text-white text-lg">Registered on: {product.registeredOn}</p>
          </div>
        </div>

        {/* Go Back Button */}
        <button onClick={handleGoBack} className="w-full border border-white rounded-md py-3 mt-8 mb-4">
          Go back
        </button>

        {/* Home Indicator */}
        <div className="w-32 h-1 bg-white rounded-full mt-4"></div>
      </div>
    </div>
  )
}

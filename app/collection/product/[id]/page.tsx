"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"

type RarityType = "Common" | "Rare" | "Epic" | "Legendary"

interface ProductDetails {
  id: string
  name: string
  image: string
  number: number
  total: number
  rarity: RarityType
  registeredOn: string
}

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState<ProductDetails | null>(null)

  useEffect(() => {
    // In a real app, you would fetch this data from an API or database
    // For now, we'll use mock data based on the ID
    const productId = params.id as string

    // Mock data for different product IDs
    const mockProducts: Record<string, ProductDetails> = {
      "1": {
        id: "1",
        name: "Loot Jacket",
        image: "/images/hoodie.png",
        number: 9999,
        total: 100000,
        rarity: "Common",
        registeredOn: "12/01/2024",
      },
      "2": {
        id: "2",
        name: "Loot Jacket",
        image: "/images/hoodie.png",
        number: 999,
        total: 1000,
        rarity: "Rare",
        registeredOn: "11/15/2023",
      },
      "3": {
        id: "3",
        name: "Loot Jacket",
        image: "/images/hoodie.png",
        number: 99,
        total: 100,
        rarity: "Epic",
        registeredOn: "10/22/2023",
      },
      "4": {
        id: "4",
        name: "Loot Jacket",
        image: "/images/hoodie.png",
        number: 1,
        total: 10,
        rarity: "Legendary",
        registeredOn: "09/05/2023",
      },
    }

    setProduct(mockProducts[productId] || mockProducts["1"])
  }, [params.id])

  const handleGoBack = () => {
    router.back()
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#050810] text-white items-center justify-center">
        <p>Loading...</p>
      </div>
    )
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-8">
        {/* Product Image */}
        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
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
            <p className="text-white text-lg">{product.rarity} item</p>
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

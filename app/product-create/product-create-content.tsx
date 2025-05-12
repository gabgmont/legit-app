"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createProduct } from "./actions"
import type { RarityType } from "@/types/product"
import { WatchLoadingAnimation } from "@/components/watch-loading-animation"

interface User {
  id: string
  name: string
  email: string
}

export default function ProductCreateContent({ user }: { user: User }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [quantity, setQuantity] = useState("")
  const [rarity, setRarity] = useState<RarityType>("Common")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    setImageFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate form
      if (!name || !brand || !quantity || !rarity) {
        throw new Error("Please fill in all fields")
      }

      if (!imageFile && !imagePreview) {
        throw new Error("Please upload a product image")
      }

      // Create FormData for file upload
      const formData = new FormData()
      formData.append("name", name)
      formData.append("brand", brand)
      formData.append("quantity", quantity)
      formData.append("rarity", rarity)

      if (imageFile) {
        formData.append("image", imageFile)
      }

      // Submit the form
      const result = await createProduct(formData)

      if (result.success) {
        // Redirect to product-list page instead of collection
        router.push("/product-list")
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error("Error creating product:", err)
      setError((err as Error).message || "Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get first letter of user's name for avatar
  const userInitial = user.name.charAt(0).toUpperCase()

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#050810] text-white">
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
        <div className="text-xl ml-4 font-medium">Product / Create</div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-8 overflow-y-auto">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md mb-6 w-full">
            {error}
          </div>
        )}

        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#121620] p-8 rounded-xl flex flex-col items-center">
              <WatchLoadingAnimation size="lg" color="#4169e1" text="Creating product" />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Image Upload */}
          <div className="mb-8">
            <label
              htmlFor="product-image"
              className="block w-full aspect-square border-2 border-dashed border-gray-600 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[#4169e1] transition-colors"
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Product preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
              <input type="file" id="product-image" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="brand" className="block text-sm font-medium">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Product brand"
                className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Quantity
              </label>
              <input
                id="quantity"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Product quantity"
                className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="rarity" className="block text-sm font-medium">
                Rarity
              </label>
              <select
                id="rarity"
                value={rarity}
                onChange={(e) => setRarity(e.target.value as RarityType)}
                className="w-full bg-transparent border-b border-gray-700 pb-2 text-white focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="Common" className="bg-[#121620]">
                  Common
                </option>
                <option value="Rare" className="bg-[#121620]">
                  Rare
                </option>
                <option value="Epic" className="bg-[#121620]">
                  Epic
                </option>
                <option value="Legendary" className="bg-[#121620]">
                  Legendary
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium mt-6 disabled:opacity-70"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createProduct } from "../actions/product"
import { LoadingDots } from "@/components/loading-animation"

interface User {
  id: string
  name: string
  email: string
}

export default function ProductCreateContent({ user }: { user: User }) {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    setError(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      if (!formData.get("name") || !formData.get("brand") || !formData.get("quantity") || !formData.get("rarity")) {
        throw new Error("Please fill in all fields")
      }

      if (!formData.get("image") && !imagePreview) {
        throw new Error("Please upload a product image")
      }

      const result = await createProduct(formData)

      if (result.success) {
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
              <input type="file" name="image" id="product-image" accept="image/*" className="hidden" onChange={handleImageChange} />
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
                name="name"
                type="text"
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
                name="brand"
                type="text"
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
                name="quantity"
                type="text"
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
                name="rarity"
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
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  Creating <LoadingDots className="ml-2" color="white" />
                </span>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

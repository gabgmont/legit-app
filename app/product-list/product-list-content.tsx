"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getAllProducts } from "../actions/product"
import type { ProductCard } from "@/types/product"
import { ProductImage } from "@/components/product-image"
import { LoadingAnimation } from "@/components/loading-animation"
import { getRarityColor } from "@/utils/rarity"

interface User {
  id: string
  name: string
  email: string
}

type RarityFilter = "All" | "Common" | "Rare" | "Epic" | "Legendary"

export default function ProductListContent({ user }: { user: User }) {
  const router = useRouter()
  const [products, setProducts] = useState<ProductCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("All")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await getAllProducts()
        setProducts(allProducts)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products based on search query and rarity filter
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Apply rarity filter
    if (rarityFilter !== "All") {
      filtered = filtered.filter((product) => product.rarity === rarityFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchLower) ||
          (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
          String(product.nonce).includes(searchLower) ||
          String(product.total).includes(searchLower) ||
          product.rarity.toLowerCase().includes(searchLower)
        )
      })
    }

    return filtered
  }, [products, searchQuery, rarityFilter])

  const handleNewProduct = () => {
    router.push("/product-create")
  }

  // Get rarity button styles
  const getRarityButtonStyles = (rarity: RarityFilter) => {
    const isActive = rarityFilter === rarity

    const baseStyles = "px-4 py-1 rounded-full text-sm font-medium transition-colors"

    if (rarity === "Common") {
      return `${baseStyles} ${isActive ? "bg-gray-600 text-white" : "border border-gray-600 text-gray-400"}`
    } else if (rarity === "Rare") {
      return `${baseStyles} ${isActive ? "bg-blue-600 text-white" : "border border-blue-600 text-blue-400"}`
    } else if (rarity === "Epic") {
      return `${baseStyles} ${isActive ? "bg-purple-600 text-white" : "border border-purple-600 text-purple-400"}`
    } else if (rarity === "Legendary") {
      return `${baseStyles} ${isActive ? "bg-orange-500 text-white" : "border border-orange-500 text-orange-400"}`
    }

    return baseStyles
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
        <line x1="0.5" y1="24" x2="0.5" stroke="white"/>
        </svg>

        <div className="text-xl ml-4 font-medium">Products</div>

      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        {/* Title and New Product Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Registered products</h1>
          <button onClick={handleNewProduct} className="bg-[#4169e1] text-white px-6 py-2 rounded-md font-medium">
            new product
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-lg mb-2">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, number or rarity"
            className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Rarity Filters */}
        <div className="flex gap-3 mb-6">
          <button
            className={getRarityButtonStyles("Common")}
            onClick={() => setRarityFilter(rarityFilter === "Common" ? "All" : "Common")}
          >
            Common
          </button>
          <button
            className={getRarityButtonStyles("Rare")}
            onClick={() => setRarityFilter(rarityFilter === "Rare" ? "All" : "Rare")}
          >
            Rare
          </button>
          <button
            className={getRarityButtonStyles("Epic")}
            onClick={() => setRarityFilter(rarityFilter === "Epic" ? "All" : "Epic")}
          >
            Epic
          </button>
          <button
            className={getRarityButtonStyles("Legendary")}
            onClick={() => setRarityFilter(rarityFilter === "Legendary" ? "All" : "Legendary")}
          >
            Legendary
          </button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingAnimation size="lg" color="#4169e1" />
            <p className="mt-4 text-gray-400">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-[#4169e1] rounded-md">
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {searchQuery || rarityFilter !== "All" ? "No products match your filters" : "No products available"}
            </p>
            {(searchQuery || rarityFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setRarityFilter("All")
                }}
                className="mt-4 px-4 py-2 bg-[#4169e1] rounded-md"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Link href={`/product-detail/${product.id}`} key={product.id}>
                <div className="border border-[#3859d4] rounded-lg overflow-hidden bg-[#0a0e1a] h-full">
                  <div className="p-4 flex items-center justify-center">
                    <div className="relative w-full h-48">
                      <ProductImage src={product.image} alt={product.name} fill />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {product.total} available
                    </p>
                    <p className={`text-sm ${getRarityColor(product.rarity)}`}>{product.rarity} item</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Paperclip, ArrowLeft, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false)

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

      {/* Header with Navigation */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/collection">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <div className="flex items-center">
          <Paperclip className="h-6 w-6 text-white mr-2" />
          <span className="text-xl font-semibold">Legit</span>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={`h-6 w-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`} />
          </button>
          <Share2 className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-4">
        {/* Product Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            <Image src="/images/hoodie.png" alt="White hoodie" fill style={{ objectFit: "contain" }} priority />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Luxury Textured Hoodie</h1>
          <p className="text-gray-300">
            Premium white hoodie with textured sleeves. Made from 100% organic cotton with a unique pattern.
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">$299.99</span>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">Verified</span>
              <Paperclip className="h-4 w-4 text-green-500" />
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-lg font-semibold mb-2">Authenticity</h2>
            <p className="text-gray-300 text-sm">
              This product has been verified as authentic by Legit. The digital certificate of authenticity is stored
              securely on our blockchain.
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium text-center mt-auto mb-4">
          Add to Cart
        </button>

        {/* Home Indicator */}
        <div className="w-32 h-1 bg-white rounded-full mx-auto mt-4"></div>
      </div>
    </div>
  )
}

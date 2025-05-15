import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050810] text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p className="text-gray-400 mb-8">The product you're looking for doesn't exist or you don't have access to it.</p>
      <Link href="/product-list" className="bg-[#4169e1] text-white px-6 py-3 rounded-md font-medium">
        Back to Products
      </Link>
    </div>
  )
}

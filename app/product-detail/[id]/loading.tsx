import { LoadingAnimation } from "@/components/loading-animation"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050810] text-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <LoadingAnimation size="lg" color="#4169e1" />
        <p className="mt-4 text-gray-400">Loading product details...</p>
      </div>
    </div>
  )
}

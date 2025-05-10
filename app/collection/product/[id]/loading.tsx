export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050810] text-white items-center justify-center">
      <div className="animate-pulse">
        <div className="h-64 w-64 bg-gray-700 rounded-md mb-8"></div>
        <div className="h-12 w-full bg-gray-700 rounded-md mb-4"></div>
        <div className="h-12 w-full bg-gray-700 rounded-md mb-4"></div>
        <div className="h-12 w-full bg-gray-700 rounded-md mb-4"></div>
        <div className="h-12 w-full bg-gray-700 rounded-md mb-8"></div>
        <div className="h-12 w-full bg-gray-700 rounded-md"></div>
      </div>
    </div>
  )
}

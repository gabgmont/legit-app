import type { ProductCard } from "@/types/product"

export function generateProductQRData(product: ProductCard): string {
  // Convert product to JSON
  const productJson = JSON.stringify(product)

  // Convert JSON to base64
  return btoa(productJson)
}

// Example usage:
// const sampleProduct = {
//   name: "Limited Edition Hoodie",
//   image: "/images/hoodie.png",
//   number: 42,
//   total: 100,
//   rarity: "Rare"
// }
//
// const qrData = generateProductQRData(sampleProduct)
// console.log(qrData)
// This base64 string can be used to generate a QR code using any QR code generator

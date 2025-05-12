import type { ProductCard } from "@/types/product"

// Legacy function for backward compatibility
export function generateProductQRData(product: ProductCard): string {
  // Convert product to JSON
  const productJson = JSON.stringify(product)

  // Convert JSON to base64
  return btoa(productJson)
}

// New function for generating QR codes with the new payload format
export function generateProductAuthQRData(productId: string, nonce: number): string {
  // Create the payload
  const payload = {
    id: productId,
    nonce: nonce,
  }

  // Convert payload to JSON
  const payloadJson = JSON.stringify(payload)

  // Convert JSON to base64
  return btoa(payloadJson)
}

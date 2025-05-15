import { requireAuth } from "@/app/actions/auth"
import { fetchProductById } from "@/app/actions/product"
import ProductDetailContent from "./product-detail-content"
import { notFound } from "next/navigation"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // Check if user is authenticated
  const user = await requireAuth()

  // Fetch product data
  const product = await fetchProductById(params.id)

  // If product not found, show 404
  if (!product) {
    notFound()
  }

  return <ProductDetailContent user={user} product={product} />
}

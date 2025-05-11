import { requireAuth } from "@/app/actions/auth"
import ProductDetailContent from "./product-detail-content"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // Check if user is authenticated
  await requireAuth()

  return <ProductDetailContent id={params.id} />
}

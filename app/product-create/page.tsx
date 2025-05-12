import { requireAuth } from "../actions/auth"
import ProductCreateContent from "./product-create-content"

export default async function ProductCreatePage() {
  // Check if user is authenticated and get user data
  const user = await requireAuth()

  return <ProductCreateContent user={user} />
}

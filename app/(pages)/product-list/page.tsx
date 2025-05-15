import { requireAuth } from "../../actions/auth"
import ProductListContent from "./product-list-content"

export default async function ProductListPage() {
  // Check if user is authenticated and get user data
  const user = await requireAuth()

  return <ProductListContent user={user} />
}

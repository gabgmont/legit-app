import { requireAuth } from "../../actions/auth"
import ProductRegistrationContent from "./product-registration-content"

export default async function ProductRegistrationPage() {
  // Check if user is authenticated
  await requireAuth()

  return <ProductRegistrationContent />
}

import { requireAuth } from "../../actions/auth"
import VerifyContent from "./verify-content"

export default async function VerifyPage() {
  // Check if user is authenticated
  await requireAuth()

  return <VerifyContent />
}

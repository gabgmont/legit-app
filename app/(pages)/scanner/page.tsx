import { requireAuth } from "../../actions/auth"
import ScannerContent from "./scanner-content"

export default async function ScannerPage() {
  // Check if user is authenticated
  await requireAuth()

  return <ScannerContent />
}

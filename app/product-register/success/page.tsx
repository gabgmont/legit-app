import { requireAuth } from "@/app/actions/auth"
import RegistrationSuccessContent from "./registration-success-content"

export default async function RegistrationSuccessPage() {
  // Check if user is authenticated
  await requireAuth()

  return <RegistrationSuccessContent />
}

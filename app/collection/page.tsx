import { requireAuth } from "../actions/auth"
import CollectionContent from "./collection-content"

export default async function CollectionPage() {
  // Check if user is authenticated and get user data
  const user = await requireAuth()

  return <CollectionContent user={user} />
}

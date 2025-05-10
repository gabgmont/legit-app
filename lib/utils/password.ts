import crypto from "crypto"

// Simple password hashing function
// In a production app, you would use a more robust library like bcrypt
export function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(`${password}${process.env.SUPABASE_JWT_SECRET || "fallback-salt"}`)
    .digest("hex")
}

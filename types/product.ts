export type RarityType = "Common" | "Rare" | "Epic" | "Legendary"

export interface ProductCard {
  id?: string
  name: string
  brand?: string
  image: string
  total: number
  rarity: RarityType
  registeredOn?: string
  nonce?: number // Add nonce field
}

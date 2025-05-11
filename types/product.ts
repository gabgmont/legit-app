export type RarityType = "Common" | "Rare" | "Epic" | "Legendary"

export interface ProductCard {
  id?: string
  name: string
  image: string
  number: number
  total: number
  rarity: RarityType
  registeredOn?: string
}

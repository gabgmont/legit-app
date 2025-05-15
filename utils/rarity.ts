import type { RarityType } from "@/types/product"

export const getRarityColor = (rarity: RarityType): string => {
  switch (rarity) {
    case "Common":
      return "text-gray-300"
    case "Rare":
      return "text-blue-400"
    case "Epic":
      return "text-purple-400"
    case "Legendary":
      return "text-orange-400"
    default:
      return "text-white"
  }
}

export const getRarityBgColor = (rarity: RarityType): string => {
  switch (rarity) {
    case "Common":
      return "bg-gray-300/10"
    case "Rare":
      return "bg-blue-400/10"
    case "Epic":
      return "bg-purple-400/10"
    case "Legendary":
      return "bg-orange-400/10"
    default:
      return "bg-transparent"
  }
}

import type { RarityType } from "@/types/product"

export const getRarityColor = (rarity: RarityType): string => {
  switch (rarity) {
    case "Common":
      return "text-gray-300" // Light gray for common items
    case "Rare":
      return "text-blue-400" // Blue for rare items
    case "Epic":
      return "text-purple-400" // Purple for epic items
    case "Legendary":
      return "text-orange-400" // Orange/gold for legendary items
    default:
      return "text-white"
  }
}

export const getRarityBgColor = (rarity: RarityType): string => {
  switch (rarity) {
    case "Common":
      return "bg-gray-300/10" // Light gray background with low opacity
    case "Rare":
      return "bg-blue-400/10" // Blue background with low opacity
    case "Epic":
      return "bg-purple-400/10" // Purple background with low opacity
    case "Legendary":
      return "bg-orange-400/10" // Orange/gold background with low opacity
    default:
      return "bg-transparent"
  }
}

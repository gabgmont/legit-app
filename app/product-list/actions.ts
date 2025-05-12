"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getCurrentUser } from "../actions/auth"
import type { ProductCard } from "@/types/product"

export async function getAllProducts(): Promise<ProductCard[]> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return []
    }

    const supabase = createServerSupabaseClient()

    // Get all products from the products table
    // Removed ordering by created_at since that column doesn't exist
    const { data, error } = await supabase.from("products").select("*")

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand,
      image: item.image,
      total: item.total || 1,
      rarity: item.rarity,
      // For products that haven't been registered yet, we'll use a placeholder nonce
      nonce: 1, // This would normally come from product_registrations
    }))
  } catch (error) {
    console.error("Error in getAllProducts:", error)
    return []
  }
}

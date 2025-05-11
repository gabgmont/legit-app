"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"
import type { ProductCard } from "@/types/product"

export type ProductResult = {
  success: boolean
  message: string
  productId?: string
}

export async function registerProduct(product: ProductCard): Promise<ProductResult> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return {
        success: false,
        message: "You must be logged in to register a product",
      }
    }

    const supabase = createServerSupabaseClient()

    // Insert the product into the database
    const { data, error } = await supabase
      .from("products")
      .insert({
        user_id: user.id,
        name: product.name,
        image: product.image,
        number: product.number,
        total: product.total,
        rarity: product.rarity,
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error registering product:", error)
      return {
        success: false,
        message: "Failed to register product. Please try again.",
      }
    }

    return {
      success: true,
      message: "Product registered successfully!",
      productId: data.id,
    }
  } catch (error) {
    console.error("Error in registerProduct:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getUserProducts(): Promise<ProductCard[]> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return []
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("registered_on", { ascending: false })

    if (error) {
      console.error("Error fetching user products:", error)
      return []
    }

    return data.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image,
      number: product.number,
      total: product.total,
      rarity: product.rarity,
      registeredOn: new Date(product.registered_on).toLocaleDateString(),
    }))
  } catch (error) {
    console.error("Error in getUserProducts:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<ProductCard | null> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return null
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error || !data) {
      console.error("Error fetching product:", error)
      return null
    }

    // Check if the product belongs to the current user
    if (data.user_id !== user.id) {
      return null
    }

    return {
      id: data.id,
      name: data.name,
      image: data.image,
      number: data.number,
      total: data.total,
      rarity: data.rarity,
      registeredOn: new Date(data.registered_on).toLocaleDateString(),
    }
  } catch (error) {
    console.error("Error in getProductById:", error)
    return null
  }
}

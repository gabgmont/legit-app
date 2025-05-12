"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"
import type { ProductCard } from "@/types/product"

export type ProductResult = {
  success: boolean
  message: string
  productId?: string
}

export async function fetchProductById(id: string): Promise<ProductCard | null> {
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

    return {
      id: data.id,
      name: data.name,
      brand: data.brand,
      image: data.image,
      total: data.total || 1,
      rarity: data.rarity,
      registeredOn: data.registered_on ? new Date(data.registered_on).toLocaleDateString() : undefined,
    }
  } catch (error) {
    console.error("Error in fetchProductById:", error)
    return null
  }
}

export async function registerProductForUser(productId: string, nonce: number): Promise<ProductResult> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return {
        success: false,
        message: "You must be logged in to register a product",
      }
    }

    const supabase = createServerSupabaseClient()

    // Check if this product with this nonce is already registered
    const { data: existingRegistration, error: checkError } = await supabase
      .from("product_registrations")
      .select("id")
      .eq("product_id", productId)
      .eq("nonce", nonce)
      .single()

    if (existingRegistration) {
      return {
        success: false,
        message: "This product has already been registered with this authentication code.",
      }
    }

    // Insert the product-user relationship
    const { data, error } = await supabase
      .from("product_registrations")
      .insert({
        product_id: productId,
        user_id: user.id,
        nonce: nonce,
        registered_on: new Date().toISOString(),
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error registering product for user:", error)
      return {
        success: false,
        message: "Failed to register product. Please try again.",
      }
    }

    return {
      success: true,
      message: "Product registered successfully!",
      productId: productId,
    }
  } catch (error) {
    console.error("Error in registerProductForUser:", error)
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

    // Get products registered to the current user from the product_registrations table
    const { data, error } = await supabase
      .from("product_registrations")
      .select(`
        id,
        nonce,
        registered_on,
        product_id,
        products (*)
      `)
      .eq("user_id", user.id)
      .order("registered_on", { ascending: false })

    if (error) {
      console.error("Error fetching user products:", error)
      return []
    }

    return data.map((item) => ({
      id: item.product_id,
      name: item.products.name,
      brand: item.products.brand,
      image: item.products.image,
      total: item.products.total || 1,
      rarity: item.products.rarity,
      registeredOn: new Date(item.registered_on).toLocaleDateString(),
      nonce: item.nonce, // Include nonce in the returned data
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

    // First check if the user has access to this product
    const { data: userProduct, error: userProductError } = await supabase
      .from("product_registrations")
      .select(`
        id,
        nonce,
        registered_on,
        product_id,
        products (*)
      `)
      .eq("user_id", user.id)
      .eq("product_id", id)
      .single()

    if (userProductError) {
      console.error("Error fetching user product:", userProductError)
      return null
    }

    if (!userProduct) {
      return null // User doesn't have access to this product
    }

    return {
      id: userProduct.product_id,
      name: userProduct.products.name,
      brand: userProduct.products.brand,
      image: userProduct.products.image,
      total: userProduct.products.total || 1,
      rarity: userProduct.products.rarity,
      registeredOn: new Date(userProduct.registered_on).toLocaleDateString(),
      nonce: userProduct.nonce, // Include nonce in the returned data
    }
  } catch (error) {
    console.error("Error in getProductById:", error)
    return null
  }
}

// Keep the existing registerProduct function for backward compatibility
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

    // Insert the product into the database with only the remaining fields
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: product.name,
        brand: product.brand || "",
        image: product.image,
        total: product.total,
        rarity: product.rarity,
        // registered_on is automatically set by the database
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

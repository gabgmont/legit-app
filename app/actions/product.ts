"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"
import type { RarityType } from "@/types/product"
import type { ProductCard } from "@/types/product"

export type ProductResult = {
  success: boolean
  message: string
  productId?: string
}

export async function createProduct(formData: FormData): Promise<ProductResult> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return {
        success: false,
        message: "You must be logged in to create a product",
      }
    }

    const name = formData.get("name") as string
    const brand = formData.get("brand") as string
    const quantity = formData.get("quantity") as string
    const rarity = formData.get("rarity") as RarityType
    const imageFile = formData.get("image") as File

    if (!name || !brand || !quantity || !rarity) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    let total = 1

    const quantityMatch = quantity.match(/(\d+)(?:\s*[/of]\s*)(\d+)/i)
    if (quantityMatch) {
      total = Number.parseInt(quantityMatch[2], 10)
    } else {
      const parsedTotal = Number.parseInt(quantity, 10)
      if (!isNaN(parsedTotal)) {
        total = parsedTotal
      }
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("products")
      .insert({
        name: name,
        brand: brand,
        total: total,
        rarity: rarity,
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error creating product:", error)
      return {
        success: false,
        message: "Failed to create product. Please try again.",
      }
    }
    let imageUrl = ""
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const fileName = `${data.id}.${imageFile.name.split(".").pop()}`
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, buffer, {
          contentType: imageFile.type,
        })
      
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName)
      imageUrl = urlData.publicUrl

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        return {
          success: false,
          message: "Failed to upload product image",
        }
      }
    }
   
    const { error: imageError } = await supabase
    .from("products")
    .update({ image: imageUrl })
    .eq("id", data.id)
    
    if (imageError) {
      console.error("Error creating product:", imageError)
      return {
        success: false,
        message: "Failed to create product. Please try again.",
      }
    }

    const jsonData = {
      name: name,
      description: `${brand} - ${rarity}`,
      image: imageUrl
    }

    const jsonBuffer = Buffer.from(JSON.stringify(jsonData, null, 2))

    const { error: jsonUploadError } = await supabase.storage
      .from("products-onchain")
      .upload(`${data.id}.json`, jsonBuffer, {
        contentType: "application/json",
      })

    if (jsonUploadError) {
      console.error("Error uploading JSON:", jsonUploadError)
      return {
        success: false,
        message: "Failed to upload product metadata",
      }
    }

    return {
      success: true,
      message: "Product created successfully!",
      productId: data.id,
    }
  } catch (error) {
    console.error("Error in createProduct:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
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
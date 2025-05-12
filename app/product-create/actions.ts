"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getCurrentUser } from "../actions/auth"
import type { RarityType } from "@/types/product"

export type ProductResult = {
  success: boolean
  message: string
  productId?: string
}

export async function createProduct(formData: FormData): Promise<ProductResult> {
  try {
    // We still check if user is authenticated even though we don't store user_id
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

    // Validate inputs
    if (!name || !brand || !quantity || !rarity) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Parse quantity to get total
    let total = 1

    // Try to parse formats like "1/100" or "1 of 100"
    const quantityMatch = quantity.match(/(\d+)(?:\s*[/of]\s*)(\d+)/i)
    if (quantityMatch) {
      total = Number.parseInt(quantityMatch[2], 10)
    } else {
      // If it's just a number, use it as the total
      const parsedTotal = Number.parseInt(quantity, 10)
      if (!isNaN(parsedTotal)) {
        total = parsedTotal
      }
    }

    const supabase = createServerSupabaseClient()

    // Handle image upload if provided
    let imagePath = ""
    if (imageFile && imageFile.size > 0) {
      // Convert File to Buffer for Supabase storage
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Upload to Supabase Storage
      const fileName = `product_${user.id}_${Date.now()}.${imageFile.name.split(".").pop()}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, buffer, {
          contentType: imageFile.type,
        })

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        return {
          success: false,
          message: "Failed to upload product image",
        }
      }

      // Get public URL for the uploaded image
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName)

      imagePath = urlData.publicUrl
    }

    // Insert the product into the database with only the remaining fields
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: name,
        brand: brand,
        image: imagePath,
        total: total,
        rarity: rarity,
        // registered_on is automatically set by the database
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

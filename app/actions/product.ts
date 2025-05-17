"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./auth";
import type { RarityType } from "@/types/product";
import type { ProductCard, ProductRegistrationCard } from "@/types/product";

export type ProductResult = {
  success: boolean;
  message: string;
  productId?: string;
  totalSupply?: number;
};

export type ProductRegistrationResult = {
  success: boolean;
  message: string;
  registrationId?: string;
};

//Product
export async function createProduct(
  formData: FormData
): Promise<ProductResult> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in to create a product",
      };
    }

    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    const quantity = formData.get("quantity") as string;
    const rarity = formData.get("rarity") as RarityType;
    const imageFile = formData.get("image") as File;

    if (!name || !brand || !quantity || !rarity) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    let total = 1;

    const quantityMatch = quantity.match(/(\d+)(?:\s*[/of]\s*)(\d+)/i);
    if (quantityMatch) {
      total = Number.parseInt(quantityMatch[2], 10);
    } else {
      const parsedTotal = Number.parseInt(quantity, 10);
      if (!isNaN(parsedTotal)) {
        total = parsedTotal;
      }
    }

    const supabase = createServerSupabaseClient();

    // Register product in the database
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: name,
        brand: brand,
        total: total,
        rarity: rarity,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return {
        success: false,
        message: "Failed to create product. Please try again.",
      };
    }

    // Upload image to the database
    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${data.id}.${imageFile.name.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, buffer, {
          contentType: imageFile.type,
        });

      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        return {
          success: false,
          message: "Failed to upload product image",
        };
      }
    }

    // Update the product with the image URL and contract address
    const { error: imageError } = await supabase
      .from("products")
      .update({ image: imageUrl })
      .eq("id", data.id);

    if (imageError) {
      console.error("Error creating product:", imageError);
      return {
        success: false,
        message: "Failed to create product. Please try again.",
      };
    }

    const jsonData = {
      name: name,
      description: `${brand} - ${rarity}`,
      image: imageUrl,
    };

    const jsonBuffer = Buffer.from(JSON.stringify(jsonData, null, 2));

    const { error: jsonUploadError } = await supabase.storage
      .from("products-onchain")
      .upload(`${data.id}.json`, jsonBuffer, {
        contentType: "application/json",
      });

    if (jsonUploadError) {
      console.error("Error uploading JSON:", jsonUploadError);
      return {
        success: false,
        message: "Failed to upload product metadata",
      };
    }

    return {
      success: true,
      message: "Product created successfully!",
      productId: data.id,
      totalSupply: total,
    };
  } catch (error) {
    console.error("Error in createProduct:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function updateProduct(
  productId: string,
  txHash: string
): Promise<ProductResult> {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("products")
    .update({ tx_hash: txHash })
    .eq("id", productId);

  if (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Failed to update product" };
  }

  return { success: true, message: "Product updated successfully" };
}

export async function deleteProduct(productId: string): Promise<ProductResult> {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }

  return { success: true, message: "Product deleted successfully" };
}

export async function fetchProductById(
  id: string
): Promise<ProductCard | null> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Error fetching product:", error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      brand: data.brand,
      image: data.image,
      total: data.total || 1,
      rarity: data.rarity,
      registeredOn: data.registered_on
        ? new Date(data.registered_on).toLocaleDateString()
        : undefined,
    };
  } catch (error) {
    console.error("Error in fetchProductById:", error);
    return null;
  }
}

export async function registerProductForUser(
  productId: string,
  nonce: number
): Promise<ProductRegistrationResult> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in to register a product",
      };
    }

    const supabase = createServerSupabaseClient();

    // Check if this product with this nonce is already registered
    const { data: existingRegistration, error: checkError } = await supabase
      .from("product_registrations")
      .select("id")
      .eq("product_id", productId)
      .eq("nonce", nonce)
      .single();

    if (existingRegistration) {
      return {
        success: false,
        message:
          "This product has already been registered with this authentication code.",
      };
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
      .single();

    if (error) {
      console.error("Error registering product for user:", error);
      return {
        success: false,
        message: "Failed to register product. Please try again.",
      };
    }

    return {
      success: true,
      message: "Product registered successfully!",
      registrationId: data.id,
    };
  } catch (error) {
    console.error("Error in registerProductForUser:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function updateProductForUser(
  registrationId: string,
  txHash: string
): Promise<ProductRegistrationResult> {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("product_registrations")
    .update({ tx_hash: txHash })
    .eq("id", registrationId);

  if (error) {
    console.error("Error updating product for user:", error);
    return { success: false, message: "Failed to update product for user" };
  }

  return { success: true, message: "Product updated successfully" };
}

export async function deleteProductRegistration(
  registrationId: string
): Promise<ProductRegistrationResult> {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("product_registrations")
    .delete()
    .eq("id", registrationId);

  if (error) {
    console.error("Error deleting product registration:", error);
    return { success: false, message: "Failed to delete product registration" };
  }

  return {
    success: true,
    message: "Product registration deleted successfully",
  };
}

export async function getUserProducts(): Promise<ProductRegistrationCard[]> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    const supabase = createServerSupabaseClient();

    // Get products registered to the current user from the product_registrations table
    const { data, error } = await supabase
      .from("product_registrations")
      .select(
        `
        id,
        nonce,
        registered_on,
        tx_hash,
        products (*)
      `
      )
      .eq("user_id", user.id)
      .order("registered_on", { ascending: false });

    if (error) {
      console.error("Error fetching user products:", error);
      return [];
    }
    console.log(data);
    
    return data.map((item) => ({
      id: item.id,
      nonce: item.nonce,
      registeredOn: new Date(item.registered_on).toLocaleDateString(),
      txHash: item.tx_hash,
      product: {
        id: item.products.id,
        name: item.products.name,
        brand: item.products.brand,
        image: item.products.image,
        total: item.products.total || 1,
        rarity: item.products.rarity,
      },
    }));
  } catch (error) {
    console.error("Error in getUserProducts:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<ProductRegistrationCard | null> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("product_registrations")
      .select(
        `
        id,
        nonce,
        registered_on,
        tx_hash,
        products (*)
      `
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user product:", error);
      return null;
    }

    if (!data) {
      return null; 
    }

    return {
      id: data.id,
      nonce: data.nonce,
      registeredOn: new Date(data.registered_on).toLocaleDateString(),
      txHash: data.tx_hash,
      product: {
        id: data.products.id,
        name: data.products.name,
        brand: data.products.brand,
        image: data.products.image,
        total: data.products.total || 1,
        rarity: data.products.rarity,
      },
    };
  } catch (error) {
    console.error("Error in getProductById:", error);
    return null;
  }
}

export async function getAllProducts(): Promise<ProductCard[]> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    const supabase = createServerSupabaseClient();

    // Get all products from the products table
    // Removed ordering by created_at since that column doesn't exist
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching products:", error);
      return [];
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
    }));
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return [];
  }
}

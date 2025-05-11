"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  style?: React.CSSProperties
}

export function ProductImage({
  src,
  alt,
  className,
  width,
  height,
  fill = true,
  priority = false,
  style = { objectFit: "contain" },
}: ProductImageProps) {
  const [error, setError] = useState(false)

  // Check if the src is a valid URL
  const isValidUrl = () => {
    try {
      // If src is already a local path starting with "/", consider it valid
      if (src.startsWith("/")) return true

      // Otherwise check if it's a valid URL
      new URL(src)
      return true
    } catch (e) {
      return false
    }
  }

  // Use the hoodie image as fallback if there's an error or invalid URL
  const imageSrc = !error && isValidUrl() ? src : "/images/hoodie.png"

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      className={className}
      width={width}
      height={height}
      fill={fill}
      priority={priority}
      style={style}
      onError={() => setError(true)}
    />
  )
}

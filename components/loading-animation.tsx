"use client"

import { cn } from "@/lib/utils"

interface LoadingAnimationProps {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: string
}

export function LoadingAnimation({ className, size = "md", color = "white" }: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn("animate-spin rounded-full border-t-2 border-b-2 border-transparent", sizeClasses[size])}
        style={{ borderTopColor: color, borderBottomColor: color }}
      ></div>
    </div>
  )
}

export function LoadingDots({ className, color = "white" }: { className?: string; color?: string }) {
  return (
    <div className={cn("flex space-x-1 items-center justify-center", className)}>
      <div
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: color, animationDelay: "0s" }}
      ></div>
      <div
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: color, animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: color, animationDelay: "0.4s" }}
      ></div>
    </div>
  )
}

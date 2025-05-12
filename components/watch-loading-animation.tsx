"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface WatchLoadingAnimationProps {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: string
  text?: string
}

export function WatchLoadingAnimation({
  className,
  size = "md",
  color = "#4169e1",
  text = "Verifying",
}: WatchLoadingAnimationProps) {
  const [dots, setDots] = useState("")

  // Animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {/* Watch face */}
      <div
        className={cn("relative rounded-full border-4 flex items-center justify-center", sizeClasses[size])}
        style={{ borderColor: color }}
      >
        {/* Watch crown */}
        <div
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-4 rounded-r-sm"
          style={{ backgroundColor: color }}
        ></div>

        {/* Watch hands container */}
        <div className="relative w-3/4 h-3/4">
          {/* Hour hand */}
          <div
            className="absolute top-1/2 left-1/2 w-1/4 h-1 rounded-full origin-left transform -translate-y-1/2 animate-spin"
            style={{
              backgroundColor: color,
              animationDuration: "6s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          ></div>

          {/* Minute hand */}
          <div
            className="absolute top-1/2 left-1/2 w-1/3 h-0.5 rounded-full origin-left transform -translate-y-1/2 animate-spin"
            style={{
              backgroundColor: color,
              animationDuration: "1.5s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          ></div>

          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>

      {/* Loading text */}
      <div className={cn("mt-4 font-medium flex items-center", textSizeClasses[size])}>
        <span>{text}</span>
        <span className="w-8 text-left">{dots}</span>
      </div>
    </div>
  )
}

import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 10, height: 24 },
    md: { width: 13, height: 30 },
    lg: { width: 16, height: 38 },
  }

  return (
    <div className={`flex items-center ${className || ""}`}>
      <Image
        src="/images/legit-logo.png"
        alt="Legit Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        className="mr-2"
      />
    </div>
  )
}

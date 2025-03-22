import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function Logo({ size = "medium", className = "" }: LogoProps) {
  const sizeClasses = {
    small: "h-8 w-auto",
    medium: "h-10 w-auto",
    large: "h-12 w-auto",
  }

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      
       {/* <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg" */}
      <Image
        src="/helenus-logo.png"
        alt="HelenusAI Logo"
        width={size === "small" ? 32 : size === "medium" ? 40 : 48}
        height={size === "small" ? 32 : size === "medium" ? 40 : 48}
        className={`${sizeClasses[size]} transition-transform duration-300 hover:scale-105`}
      //   >
      //   <circle cx="30" cy="30" r="30" fill="#1E2659" />
      //   <path d="M30 60C30 60 60 60 60 30C60 0 90 0 90 30C90 60 60 90 30 60Z" fill="#1E2659" />
      //   <circle cx="30" cy="75" r="15" fill="#0066A5" />
      // </svg>
      />
      <span className="ml-2 font-display font-bold text-xl text-brand-navy">HelenusAI</span>
    </Link>
  )
}


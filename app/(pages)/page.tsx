"use client";

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { CenteredContainer } from "@/components/center-container";

export default function LandingPage() {
  return (
    <CenteredContainer>
      {/* Hoodie Image */}
      <div className="flex justify-center w-full mb-8">
        <div className="relative w-64 h-64">
          <Image
            src="/images/hoodie.png"
            alt="White hoodie"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Logo and Tagline */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Logo size="lg" />
          <span className="text-3xl font-bold">Legit</span>
        </div>
        <p className="text-center text-gray-300">
          The digital seal of luxury authenticity
        </p>
      </div>

      {/* Get Started Button */}
      <Link
        href="/signup"
        className="w-full max-w-xs bg-[#4169e1] text-white py-3 rounded-md font-medium text-center mb-8"
      >
        Get started
      </Link>

    </CenteredContainer>
  );
}

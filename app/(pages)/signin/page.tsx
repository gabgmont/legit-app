"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "../../actions/auth";
import { Logo } from "@/components/logo";
import { LoadingDots } from "@/components/loading-animation";
import { LegitInput } from "@/components/legit-input";
import { LegitButton } from "@/components/legit-button";
import { CenteredContainer } from "@/components/center-container";
import { Spacer } from "@/components/spacer";
import { LegitLogoHorizontal } from "@/components/legit-logo";

export default function SignInScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      const formData = new FormData(e.currentTarget);
      const result = await signIn(formData);

      if (result.success) {
        router.push("/collection");
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContainer>
      <LegitLogoHorizontal />

      <Spacer />

      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <Image
            src="/images/hoodie.png"
            alt="White hoodie"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center">Sign in</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <LegitInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your e-mail"
          required
        />
        <LegitInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
        <LegitButton
          label="Enter"
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          loadingLabel="Authenticating"
        />
      </form>
      <Spacer />
    </CenteredContainer>
  );
}

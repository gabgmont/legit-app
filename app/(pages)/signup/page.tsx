"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../../actions/auth";
import { LegitInput } from "@/components/legit-input";
import { CenteredContainer } from "@/components/center-container";
import { LegitButton } from "@/components/legit-button";
import { Spacer } from "@/components/spacer";
import { LegitLogoHorizontal } from "@/components/legit-logo";

export default function CreateAccountScreen() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await registerUser(formData);
      
      if (result.success) {
        if (result.redirectTo) {
          router.push(result.redirectTo);
        }
      } else {
        setFormError(result.message);
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <CenteredContainer>
      <LegitLogoHorizontal />
      <Spacer />
      <h1 className="text-4xl font-bold mb-10 text-center">
        Create
        <br />
        account
      </h1>
      {formError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 py-2 rounded-md mb-6">
          {formError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <LegitInput
          label="Name"
          placeholder="Enter your name"
          type="text"
          name="name"
        />
        <LegitInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          name="email"
        />
        <LegitInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
        />
        <LegitButton
          label="Register"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingLabel="Registering"
        />
      </form>

      <Spacer />

      <div className="mt-auto mb-8 text-center">
        <p className="text-white mb-2">Already have an account?</p>
        <Link href="/signin" className="text-[#4169e1] font-medium">
          Sign in
        </Link>
      </div>
      {/* Removed home indicator */}
    </CenteredContainer>
  );
}

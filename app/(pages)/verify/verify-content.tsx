"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CenteredContainer } from "@/components/center-container";
import { LegitButtonOutline } from "@/components/legit-button";

export default function VerifyContent() {
  const router = useRouter();
  const [verificationMethod, setVerificationMethod] = useState<string | null>(
    null
  );

  const handleGoBack = () => {
    router.back();
  };

  return (
    <CenteredContainer>
      <h1 className="text-5xl font-bold mb-3">Authenticate</h1>
      <p className="text-lg text-gray-300 mb-10">
        Choose an authentication method
      </p>

      <button
        className='w-full border border-[#0047FF] rounded-xl p-6 flex flex-col items-center justify-center h-[180px] bg-transparent'
        onClick={() => router.push("/scanner")}
      >
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <Image
            src="/images/qr-code.png"
            alt="QR code scanner"
            width={120}
            height={120}
            priority
          />
        </div>
        <span className="text-xl">QR code</span>
      </button>

      <div className="text-lg my-6 text-center">or</div>

      {/* NFC Option */}
      <button
        disabled
        className='w-full border border-[#0a0e1a] rounded-xl p-6 flex flex-col items-center justify-center h-[180px] bg-[#0a0e1a]'
        onClick={() => {
          // Handle NFC scanning (would be implemented in a real app)
          alert("NFC scanning would start here");
        }}
      >
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <Image
            src="/images/nfc.png"
            alt="NFC tag"
            width={120}
            height={120}
            priority
          />
        </div>
        <span className="text-xl">NFC tag</span>
      </button>

      <LegitButtonOutline label={"Go Back"} onClick={handleGoBack} />
    </CenteredContainer>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ProductCard } from "@/types/product";
import {
  fetchProductById,
  registerProductForUser,
  estimateGasToRegisterProduct,
} from "../../actions/product";
import { LoadingAnimation } from "@/components/loading-animation";
import { ProductImage } from "@/components/product-image";
import { getRarityColor } from "@/utils/rarity";
import { CenteredContainer } from "@/components/center-container";
import { LegitButton, LegitButtonOutline } from "@/components/legit-button";
import { Spacer } from "@/components/spacer";
import { useTransaction } from "@/hooks/use-transaction";
import { el } from "date-fns/locale";

interface QRCodePayload {
  id: string;
  nonce: number;
}

export default function ProductRegistrationContent() {
  const router = useRouter();
  
  const { setLoadingTransaction, setTransactionSuccess, setTransactionError } = useTransaction();
  const [isRegistering, setIsRegistering] = useState(false);
  const [productData, setProductData] = useState<ProductCard | null>(null);
  const [qrPayload, setQrPayload] = useState<QRCodePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gasEstimate, setGasEstimate] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsRegistering(false);

      const scannedProductPayload = sessionStorage.getItem(
        "scannedProductPayload"
      );

      if (scannedProductPayload) {
        const payload = JSON.parse(scannedProductPayload) as QRCodePayload;
        setQrPayload(payload);

        fetchProductById(payload.id)
          .then((product) => {
            if (product) {
              setProductData({
                ...product,
                nonce: payload.nonce,
              });

              try {
                estimateGasToRegisterProduct(payload.id, payload.nonce).then(
                  (gasEstimate) => {
                    console.log("Gas estimate:", gasEstimate);
                    if (gasEstimate) {
                      setGasEstimate(gasEstimate);
                    } else {
                      setError("Failed to estimate gas. Please try again.");
                    }
                  }
                );
              } catch (err) {
                console.error("Error estimating gas:", err);
                setError("Failed to estimate gas. Please try again.");
              }
            } else {
              setError("Product not found. Please scan a valid QR code.");
            }
          })
          .catch((err) => {
            console.error("Error fetching product:", err);
            setError("Failed to load product data. Please try again.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setError("No product data found. Please scan a QR code first.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error parsing product payload:", err);
      setError("Invalid product data format");
      setIsLoading(false);
    }
  }, []);

  const handleRegister = async () => {
    setIsRegistering(true)
    
    if (!productData || !qrPayload) {
      setError("No product data to register");
      return;
    }
    setError(null);

    setLoadingTransaction(true)
    let error = false;

    try {
      const result = await registerProductForUser(
        qrPayload.id,
        qrPayload.nonce
      );

      if (result.success) {
        sessionStorage.setItem(
          "registeredProduct",
          JSON.stringify(productData)
        );
        sessionStorage.removeItem("scannedProductPayload");
        router.push("/product-register/success");

      } else {
        error = true;
      }
    } catch (err) {
      error = true
      console.error("Error registering product:", err);
      setError("Failed to register product. Please try again.");

    } finally {
      setIsRegistering(false)
      
      if (error) {
        setTransactionError()
      } else {
        setTransactionSuccess()
      }
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem("scannedProductPayload");
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#050810] text-white items-center justify-center">
        <LoadingAnimation size="lg" color="#4169e1" />
        <p className="mt-4">Loading product data...</p>
      </div>
    );
  }

  return (
    <CenteredContainer>
      <h1 className="text-4xl font-bold mb-12">Registration</h1>

      <Spacer />

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-md mb-6 w-full">
          {error}
        </div>
      )}

      {productData && (
        <div className="flex flex-col items-center justify-center text-center">
          {/* Product Image */}
          <div className="mb-8">
            <div className="relative w-64 h-64">
              <ProductImage
                src={productData.image}
                alt={productData.name || "Product"}
                priority
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">{productData.name}</h2>

            {productData.brand && (
              <p className="text-gray-300 mb-2">Brand: {productData.brand}</p>
            )}

            <p
              className={`font-medium mb-2 ${getRarityColor(
                productData.rarity
              )}`}
            >
              {productData.rarity} item
            </p>

            {gasEstimate && (
              <p className="text-gray-300 mb-2">
                Transaction cost: {gasEstimate} ETH
              </p>
            )}

            {/* Display Nonce */}
            <div className="mt-4 p-3 w-fit bg-[#121620] rounded-md">
              <p className="text-gray-300">
                #{productData.nonce} out of {productData.total}
              </p>
            </div>
          </div>
        </div>
      )}

      <Spacer />

      <div className="w-full space-y-4 mt-6">
        <LegitButton
          label="Register"
          loadingLabel="Registering"
          onClick={handleRegister}
          loading={isRegistering}
          disabled={isRegistering || !productData}
        />
        <LegitButtonOutline label={"Cancel"} onClick={handleCancel} />
      </div>
    </CenteredContainer>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Search, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "../../actions/auth";
import { getUserProducts } from "../../actions/product";
import type { ProductRegistrationCard } from "@/types/product";
import { LoadingAnimation } from "@/components/loading-animation";
import { ProductImage } from "@/components/product-image";
import { getRarityColor } from "@/utils/rarity";

interface User {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
}

// Add this custom hook after the imports but before the component
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function CollectionContent({ user }: { user: User }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<ProductRegistrationCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const userProducts = await getUserProducts();
        setProducts(userProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [debouncedSearchQuery, searchQuery]);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return products;

    const searchLower = debouncedSearchQuery.toLowerCase().trim();

    return products.filter((productRegistration) => {
      return (
        productRegistration.product.name.toLowerCase().includes(searchLower) ||
        productRegistration.product.rarity
          .toLowerCase()
          .includes(searchLower) ||
        String(productRegistration.nonce).includes(searchLower) ||
        String(productRegistration.product.total).includes(searchLower) ||
        (productRegistration.registeredOn &&
          productRegistration.registeredOn.toLowerCase().includes(searchLower))
      );
    });
  }, [products, debouncedSearchQuery]);

  const handleAddItem = () => {
    router.push("/verify");
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        // Use client-side navigation after successful sign out
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get first letter of user's name for avatar
  const userInitial = user.name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050810] text-white overflow-hidden">
      {/* Fixed Header Section */}
      <div className="flex-none">
        {/* User Profile */}
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center relative flex-1 min-w-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center focus:outline-none w-full min-w-0"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center mr-3 shrink-0">
                <span className="text-white font-semibold">{userInitial}</span>
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-xl font-semibold">{user.name}</span>
                <span className="text-sm text-gray-300 truncate overflow-hidden whitespace-nowrap w-full">
                  {user.walletAddress}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-12 left-0 bg-[#121620] border border-gray-700 rounded-md shadow-lg z-10 w-40">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-[#1a1f2c] transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleAddItem}
            className="w-8 h-8 flex items-center justify-center ml-4 shrink-0"
          >
            <Plus className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Collection Title */}
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold">my collection</h1>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-6">
          <div className="relative">
            <label className="text-sm font-medium mb-1 block">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, brand, number or rarity"
                className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 pl-0 pr-8"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5">
                {isSearching ? (
                  <LoadingAnimation size="sm" color="#4169e1" />
                ) : (
                  <Search className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Product Grid - Hide scrollbar when not needed */}
      <div className="flex-grow px-6 pb-4 overflow-auto scrollbar-hide">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingAnimation size="lg" color="#4169e1" />
            <p className="mt-4 text-gray-400">Loading your collection...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#4169e1] rounded-md"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {searchQuery
                ? `No products match "${searchQuery}"`
                : "Your collection is empty"}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 bg-[#4169e1] rounded-md"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={handleAddItem}
                className="mt-4 px-4 py-2 bg-[#4169e1] rounded-md"
              >
                Add Your First Item
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((productRegistration) => (
              <Link
                href={`/product/${productRegistration.id}?nonce=${productRegistration.nonce}`}
                key={`${productRegistration.id}-${productRegistration.nonce}`}
              >
                <div className="border border-[#3859d4] rounded-lg overflow-hidden">
                  <div className="bg-[#0a0e1a] p-4 flex items-center justify-center">
                    <div className="relative w-full h-32">
                      <ProductImage
                        src={productRegistration.product.image}
                        alt={productRegistration.product.name}
                        fill
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3
                      className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap"
                      title={productRegistration.product.name}
                    >
                      {productRegistration.product.name}
                    </h3>
                    <p
                      className={`text-xs font-medium ${getRarityColor(
                        productRegistration.product.rarity
                      )}`}
                    >
                      {productRegistration.product.rarity} item
                    </p>

                    {/* Display Nonce */}
                    <div className="mt-1 flex justify-between items-center">
                      <p className="text-xs text-gray-400">
                        #{productRegistration.nonce} out of{" "}
                        {productRegistration.product.total}
                      </p>
                      <p className="text-xs text-gray-400">
                        {productRegistration.registeredOn}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

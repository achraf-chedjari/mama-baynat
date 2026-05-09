"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

interface WishlistButtonProps {
  houseId: string;
}

export default function WishlistButton({ houseId }: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(houseId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(houseId);
      }}
      className={`absolute top-3 left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md transition-all hover:scale-110 ${
        active ? "text-red-500" : "text-gray-400"
      }`}
      aria-label={active ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
    >
      <Heart
        className={`h-5 w-5 transition-all ${active ? "fill-red-500" : ""}`}
      />
    </button>
  );
}

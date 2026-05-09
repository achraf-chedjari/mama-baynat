"use client";

import { useState, useEffect, useCallback } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("mama-baynat-wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  const toggleWishlist = useCallback((houseId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(houseId)
        ? prev.filter((id) => id !== houseId)
        : [...prev, houseId];
      localStorage.setItem("mama-baynat-wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (houseId: string) => wishlist.includes(houseId),
    [wishlist]
  );

  return { wishlist, toggleWishlist, isWishlisted };
}

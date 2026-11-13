import { useState, useEffect } from "react";
import { useWishlistStore } from "../store/useWishlistStore";

export const useWishlist = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const wishlistState = useWishlistStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return {
    ...wishlistState,
    wishlist: hasMounted ? wishlistState.wishlist : [],
    wishlistCount: hasMounted ? wishlistState.wishlist.length : 0,
  };
};
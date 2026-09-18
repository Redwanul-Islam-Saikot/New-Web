import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category?: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.some((item) => item._id === product._id);
        if (!exists) {
          set({ wishlist: [...currentWishlist, product] });
        }
      },
      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter((item) => item._id !== productId),
        });
      },
      toggleWishlist: (product) => {
        const exists = get().isInWishlist(product._id);
        if (exists) {
          get().removeFromWishlist(product._id);
        } else {
          get().addToWishlist(product);
        }
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item._id === productId);
      },
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "dazzling-diva-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
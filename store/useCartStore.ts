import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((i) => i._id === item._id);

        if (existingItem) {
          set({
            cart: currentCart.map((i) =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...currentCart, item] });
        }
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item._id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item._id === id ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "dazzling-diva-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
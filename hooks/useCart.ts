import { useState, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";

export const useCart = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const cartState = useCartStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const totalItems = hasMounted
    ? cartState.cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const totalPrice = hasMounted
    ? cartState.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return {
    ...cartState,
    cart: hasMounted ? cartState.cart : [],
    totalItems,
    totalPrice,
  };
};
// app/context/cartContext.tsx
"use client";
import { createContext, useContext, useState } from "react";
import { GetCartItems } from "../lib/actions";
import { CartWithItem } from "../types/types";

type CartContextType = {
  cartItems: CartWithItem["items"];
 /* eslint-disable  */
  refreshCart: (cartID: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartWithItem['items']>([]);

  const refreshCart = async (cartID: string) => {
    const data = await GetCartItems(cartID);
    setCartItems(data?.items || []);
  };

  return (
    <CartContext.Provider value={{ cartItems, refreshCart}}>
      {children}
    </CartContext.Provider>
  );
};
// ✅ Typed custom hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return context;
};

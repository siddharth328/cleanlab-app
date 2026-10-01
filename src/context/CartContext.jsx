import React, { createContext, useContext, useState } from "react";
import { useStore } from "./StoreContext.jsx";
import { effectivePrice } from "../utils/format.js";

const CartContext = createContext(null);
const FREE_SHIPPING_THRESHOLD = 149900;
const SHIPPING_FEE = 7900;

export function CartProvider({ children }) {
  const { products } = useStore();
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [isOpen, setIsOpen] = useState(false);

  const lines = cart
    .map((line) => ({ ...line, product: products.find((p) => p.id === line.id) }))
    .filter((line) => line.product);

  const subtotal = lines.reduce((sum, l) => sum + effectivePrice(l.product) * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);

  function addToCart(product) {
    if (!product || product.stock <= 0) return;
    setCart((c) => {
      const existing = c.find((l) => l.id === product.id);
      if (existing) {
        return c.map((l) =>
          l.id === product.id ? { ...l, qty: Math.min(l.qty + 1, product.stock) } : l
        );
      }
      return [...c, { id: product.id, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setCart((c) => {
      const product = products.find((p) => p.id === id);
      return c
        .map((l) => (l.id === id ? { ...l, qty: Math.max(0, Math.min(l.qty + delta, product?.stock ?? l.qty)) } : l))
        .filter((l) => l.qty > 0);
    });
  }

  function removeFromCart(id) {
    setCart((c) => c.filter((l) => l.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const value = {
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping,
    itemCount,
    addToCart,
    changeQty,
    removeFromCart,
    clearCart,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

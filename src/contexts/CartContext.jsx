// src/contexts/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

/* price の文字列 → 数値 */
function normalizePrice(price) {
  if (typeof price === "number") return price;
  if (!price) return 0;
  return Number(price.replace(/[^0-9.]/g, ""));
}

/* ID fallback */
function ensureId(product) {
  if (product.id) return product.id;
  return `${product.name}-${product.model || ""}`.replace(/\s+/g, "");
}

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product, qty = 1) => {
    const id = ensureId(product);
    const price = normalizePrice(product.price);

    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx >= 0) {
        const copy = [...prev];
        const newQty = Math.min(99, copy[idx].qty + qty);
        copy[idx] = { ...copy[idx], qty: newQty };
        return copy;
      }
      return [
        ...prev,
        {
          id,
          name: product.name,
          model: product.model,
          price,
          image: product.image || product.img,
          qty: Math.max(1, Math.min(99, qty)),
        },
      ];
    });

    setIsOpen(true);
  };

  const removeItem = (id) =>
    setCartItems((prev) => prev.filter((p) => p.id !== id));

  const clear = () => setCartItems([]);

  /* qty = 0 なら削除 */
  const setQty = (id, qty) => {
    const q = Math.max(0, Math.min(99, qty));
    setCartItems((prev) =>
      q === 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, qty: q } : p))
    );
  };

  const inc = (id) => {
    const target = cartItems.find((p) => p.id === id);
    if (!target) return;
    setQty(id, target.qty + 1);
  };

  const dec = (id) => {
    const target = cartItems.find((p) => p.id === id);
    if (!target) return;
    setQty(id, target.qty - 1); // 0 → 削除
  };

  const count = useMemo(
    () => cartItems.reduce((sum, p) => sum + p.qty, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, p) => sum + normalizePrice(p.price) * p.qty,
        0
      ),
    [cartItems]
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      openCart,
      closeCart,

      cartItems,
      addItem,
      removeItem,
      clear,

      setQty,
      inc,
      dec,

      count,
      subtotal,
      shipping,
      total,
    }),
    [isOpen, cartItems, subtotal, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext); // ← 修正済み
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

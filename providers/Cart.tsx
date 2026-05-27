"use client";

// in: providers/Cart.tsx
// ÎNLOCUIEȘTE complet fișierul existent

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;          // _id din Sanity
  stripePriceId: string;
  nume: string;
  pret: number;
  quantity: number;
  imagineUrl: string | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Încarcă coșul din localStorage la prima randare (doar client-side)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart_items");
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.error("Eroare la încărcarea coșului:", e);
    }
    setHydrated(true);
  }, []);

  // Salvează în localStorage la orice modificare
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("cart_items", JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === newItem.id);
      if (exists) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true); // Deschide sidebar-ul automat
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart_items");
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.pret * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart trebuie folosit în interiorul CartProvider");
  }
  return context;
}

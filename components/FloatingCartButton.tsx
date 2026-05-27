"use client";

// in: components/FloatingCartButton.tsx
// ÎNLOCUIEȘTE complet fișierul existent

import { useCart } from "@/providers/Cart";
import { ShoppingCart } from "lucide-react";

export default function FloatingCartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-30 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:scale-110 active:scale-95"
      aria-label="Deschide coșul"
    >
      <ShoppingCart size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}

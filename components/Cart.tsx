"use client";

import { useCart } from "@/providers/Cart";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative flex items-center justify-center"
      aria-label={`Coș de cumpărături cu ${totalItems} produse`}
    >
      <ShoppingBag className="w-6 h-6 text-white transition-colors hover:text-cyan-400" />

      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {totalItems}
        </span>
      )}
    </button>
  );
}
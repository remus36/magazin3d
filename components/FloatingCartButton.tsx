// in components/FloatingCartButton.tsx
"use client";

import { useShoppingCart } from "use-shopping-cart";
import { ShoppingBag } from "lucide-react";

export default function FloatingCartButton() {
  const { cartCount, handleCartClick } = useShoppingCart();

  return (
    <button 
      onClick={() => handleCartClick()} 
      // Aici este magia: clasele pentru poziționare
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-700 transition-all transform hover:scale-110"
      aria-label={`Coș de cumpărături cu ${cartCount} produse`}
    >
      <ShoppingBag className="w-8 h-8" />
      
      {cartCount !== undefined && cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900 animate-pulse">
          {cartCount}
        </span>
      )}
    </button>
  );
}
// in components/Cart.tsx
"use client";

import { useShoppingCart } from "use-shopping-cart";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  // Preluăm funcționalitățile necesare din hook.
  // Acum ele sunt folosite, deci avertismentul va dispărea.
  const { cartCount, handleCartClick } = useShoppingCart();

  return (
    <button 
      onClick={() => handleCartClick()} 
      className="relative flex items-center justify-center"
      aria-label={`Coș de cumpărături cu ${cartCount} produse`}
    >
      <ShoppingBag className="w-6 h-6 text-white" />
      
      {/* Afișăm numărul de produse doar dacă există cel puțin unul în coș */}
      {cartCount !== undefined && cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );
}
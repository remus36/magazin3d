"use client";

// in: components/CartSidebar.tsx
// ÎNLOCUIEȘTE complet fișierul existent

import { useCart } from "@/providers/Cart";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  // Blochează scroll-ul când sidebar-ul e deschis
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">
              Coșul tău{" "}
              {totalItems > 0 && (
                <span className="text-cyan-400">({totalItems})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista produse */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag className="w-16 h-16 text-gray-700" />
              <p className="text-gray-400 text-lg">Coșul tău este gol</p>
              <button
                onClick={closeCart}
                className="text-cyan-400 hover:text-cyan-300 underline text-sm"
              >
                Continuă cumpărăturile
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
              >
                {/* Imagine */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700">
                  {item.imagineUrl ? (
                    <Image
                      src={item.imagineUrl}
                      alt={item.nume}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <ShoppingBag size={24} />
                    </div>
                  )}
                </div>

                {/* Detalii */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{item.nume}</p>
                  <p className="text-cyan-400 font-semibold mt-1">{item.pret} RON</p>

                  {/* Cantitate */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-white w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Șterge */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer cu total + buton checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-bold text-lg">
                {totalPrice.toFixed(2)} RON
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Transport calculat la checkout. Livrare doar în România.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white text-center font-bold py-3 rounded-md transition-colors active:scale-95"
            >
              Finalizează Comanda →
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-gray-400 hover:text-white text-center text-sm py-1 transition-colors"
            >
              Continuă cumpărăturile
            </button>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

// in: app/checkout/page.tsx
// FIȘIER NOU

import { useCart } from "@/providers/Cart";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lock, Package, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (items.length === 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Eroare necunoscută");

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare. Încearcă din nou.");
      setLoading(false);
    }
  }

  // Coș gol
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Coșul tău este gol</h1>
          <p className="text-gray-400 mb-6">Adaugă produse înainte de a plasa o comandă.</p>
          <Link
            href="/magazin"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-md font-bold transition-colors"
          >
            Mergi la Magazin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Finalizează Comanda</h1>
        <p className="text-gray-400 mb-10">
          Verifică produsele și plătește securizat prin Stripe.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sumar produse — stânga */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <Package className="w-5 h-5 text-cyan-400" />
                Produse ({totalItems})
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700">
                      {item.imagineUrl && (
                        <Image
                          src={item.imagineUrl}
                          alt={item.nume}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{item.nume}</p>
                      <p className="text-gray-400 text-sm">Cantitate: {item.quantity}</p>
                    </div>
                    <p className="text-cyan-400 font-bold flex-shrink-0">
                      {(item.pret * item.quantity).toFixed(2)} RON
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info plată */}
            <div className="mt-4 bg-gray-800 border border-gray-700 rounded-xl p-5">
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                Plata este procesată securizat de Stripe. Vei fi redirecționat
                către pagina de plată Stripe unde poți introduce datele cardului
                și adresa de livrare.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-5 opacity-60"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-5 opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Total + buton — dreapta */}
          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Sumar</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal produse</span>
                  <span>{totalPrice.toFixed(2)} RON</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Transport</span>
                  <span className="text-green-400">Calculat la Stripe</span>
                </div>
              </div>

              <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-gray-700">
                <span>Total</span>
                <span className="text-cyan-400">{totalPrice.toFixed(2)} RON</span>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Se procesează...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Plătește {totalPrice.toFixed(2)} RON
                  </>
                )}
              </button>

              <Link
                href="/magazin"
                className="block text-center text-gray-400 hover:text-white text-sm mt-3 transition-colors"
              >
                ← Înapoi la magazin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

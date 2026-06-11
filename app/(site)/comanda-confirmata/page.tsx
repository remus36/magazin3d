"use client";

// in: app/comanda-confirmata/page.tsx
// FIȘIER NOU

import { useCart } from "@/providers/Cart";
import { CheckCircle2, Package, Home, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ConfirmareContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const cleared = useRef(false);

  // Golim coșul o singură dată după confirmare
  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true;
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Icon animat */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-14 h-14 text-green-400" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Comandă Plasată! 🎉</h1>
        <p className="text-gray-400 text-lg mb-2">Mulțumesc pentru comanda ta!</p>
        <p className="text-gray-500 text-sm mb-8">
          Vei primi un email de confirmare în câteva minute. Îți voi trimite un
          mesaj când comanda este pregătită pentru livrare.
        </p>

        {/* Card info */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Procesare comandă</p>
              <p className="text-gray-400 text-sm">
                Comanda va fi procesată și pregătită în 1-3 zile lucrătoare.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Confirmare pe email</p>
              <p className="text-gray-400 text-sm">
                Stripe ți-a trimis automat o chitanță pe email.
              </p>
            </div>
          </div>
          {sessionId && (
            <div className="pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                ID comandă:{" "}
                <span className="font-mono text-gray-400">
                  {sessionId.slice(0, 24)}...
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/magazin"
            className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            Continuă Cumpărăturile
          </Link>
          <Link
            href="/"
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Acasă
          </Link>
        </div>

        <p className="mt-8 text-gray-600 text-sm">
          Ai întrebări?{" "}
          <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">
            Contactează-mă
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ComandaConfirmataPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmareContent />
    </Suspense>
  );
}

"use client";

// in: components/ProductCard.tsx
// ÎNLOCUIEȘTE complet fișierul existent

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/Cart";
import { SimplifiedProduct } from "@/types";

export default function ProductCard({ product }: { product: SimplifiedProduct }) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleAddItem(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation(); // Nu declanșa navigarea la click pe buton

    if (!product.stripePriceId) {
      toast.error("Acest produs nu este disponibil pentru vânzare.");
      return;
    }

    addItem({
      id: product.id,
      stripePriceId: product.stripePriceId,
      nume: product.nume,
      pret: product.pret,
      imagineUrl: product.imagineUrl,
    });

    toast.success(`${product.nume} adăugat în coș!`, {
      icon: "🛒",
      style: {
        background: "#1f2937",
        color: "#fff",
        border: "1px solid #374151",
      },
    });
  }

  function handleCardClick() {
    if (product.slug) {
      router.push(`/magazin/${product.slug}`);
    } else {
      toast.error("Nu se poate naviga la acest produs.");
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col border border-gray-700 hover:border-cyan-500 transition-colors duration-300 cursor-pointer"
    >
      {/* Imagine */}
      <div className="relative w-full h-64 bg-gray-700">
        {product.imagineUrl ? (
          <Image
            src={product.imagineUrl}
            alt={product.nume}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <ShoppingCart size={40} />
          </div>
        )}
      </div>

      {/* Detalii */}
      <div className="p-4 flex flex-col flex-grow text-center">
        <h3 className="text-xl font-semibold flex-grow">{product.nume}</h3>
        <div className="mt-auto pt-4">
          <p className="mt-2 text-2xl font-bold text-cyan-400">{product.pret} RON</p>
          <button
            onClick={handleAddItem}
            disabled={!product.stripePriceId}
            className="mt-4 w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors active:scale-95"
          >
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
}

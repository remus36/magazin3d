"use client";

// in: app/magazin/[slug]/AddToCartBtn.tsx
// ÎNLOCUIEȘTE complet fișierul existent

import { useCart } from "@/providers/Cart";
import { toast } from "react-hot-toast";

interface AddToCartBtnProps {
  product: {
    _id: string;
    nume: string;
    pret: number;
    stripePriceId: string;
    imagineUrl: string | null;
  };
}

export default function AddToCartBtn({ product }: AddToCartBtnProps) {
  const { addItem } = useCart();

  function handleAddItem() {
    if (!product.stripePriceId) {
      toast.error("Acest produs nu este disponibil pentru vânzare.");
      return;
    }

    addItem({
      id: product._id,
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

  return (
    <button
      onClick={handleAddItem}
      disabled={!product.stripePriceId}
      className="w-full max-w-xs bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed active:scale-95"
    >
      Adaugă în Coș
    </button>
  );
}

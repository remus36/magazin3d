// in: app/magazin/[slug]/AddToCartBtn.tsx

"use client";

import { useShoppingCart } from "use-shopping-cart";
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
  const { addItem } = useShoppingCart();

  function handleAddItem() {
    if (!product.stripePriceId) {
      toast.error("Acest produs nu este disponibil pentru vânzare.");
      return;
    }

    const itemToAdd = {
      id: product.stripePriceId, // ID-ul prețului de la Stripe
      price: product.pret,        // Prețul numeric
      sku: product._id,           // ID-ul produsului din Sanity
      name: product.nume,
      currency: 'RON',
      image: product.imagineUrl || '',
    };
    
    addItem(itemToAdd);
    toast.success(`${product.nume} a fost adăugat în coș!`);
  }

  return (
    <button
      onClick={handleAddItem}
      disabled={!product.stripePriceId}
      className="w-full max-w-xs bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      Adaugă în Coș
    </button>
  );
}
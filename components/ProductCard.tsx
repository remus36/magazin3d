"use client";

import Image from 'next/image';
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from 'react-hot-toast';
import { SimplifiedProduct } from "@/types";

interface ProductCardProps {
  product: SimplifiedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useShoppingCart();

  function handleAddItem() {
    if (!product.stripePriceId) {
      toast.error("Acest produs nu este disponibil pentru vânzare.");
      return;
    }

    // --- BLOCUL CRUCIAL, REVIZUIT ---
    const itemToAdd = {
      // 'price' ESTE NUMERIC. Îi dăm prețul de afișare.
      price: product.pret,

      // 'sku' ESTE ID-ul prețului de la Stripe (price_...).
      // Aceasta este convenția pe care o folosesc multe versiuni
      // pentru a trimite ID-ul la checkout.
      sku: product.stripePriceId,
      
      // Aici adăugăm și ID-ul produsului din Sanity ca 'product_id'
      // pentru a-l avea la dispoziție dacă avem nevoie.
      product_id: product.id,

      // Restul datelor pentru afișare.
      name: product.nume,
      currency: 'RON',
      image: product.imagineUrl || '',
    };
    // --- SFÂRȘITUL BLOCULUI REVIZUIT ---

    // Acum 'price' este number, iar TypeScript este fericit.
    addItem(itemToAdd);

    toast.success(`${product.nume} a fost adăugat în coș!`);
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col border border-gray-700">
      {/* ... restul codului JSX rămâne IDENTIC ... */}
      <div className="relative w-full h-64 bg-gray-700">
        {product.imagineUrl && (
          <Image 
            src={product.imagineUrl}
            alt={product.nume}
            fill 
            sizes="(max-width: 768px) 50vw, 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow text-center">
        <h3 className="text-xl font-semibold flex-grow">{product.nume}</h3>
        <div className="mt-auto pt-4">
          <p className="mt-2 text-2xl font-bold text-cyan-400">{product.pret} RON</p>
          <button 
            onClick={handleAddItem}
            className="mt-4 w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 disabled:bg-gray-500"
            disabled={!product.stripePriceId}
          >
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
}
// Fisier: components/ProductCard.tsx

"use client";

import Image from 'next/image';
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  nume: string;
  pret: number;
  stripePriceId: string;
  imagineUrl: string | null;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useShoppingCart();

  function handleAddItem() {
    if (!product.stripePriceId) {
      toast.error("Acest produs nu este disponibil pentru vânzare.");
      return;
    }
const itemToAdd = {
      // 'price' este PREȚUL NUMERIC
      price: product.pret, 

      // 'id' este ID-ul PREȚULUI de la Stripe. Biblioteca îl va folosi
      // în loc de 'price' la checkout.
      id: product.stripePriceId, 

      // SKU-ul rămâne ID-ul unic al produsului din Sanity/CMS
      sku: product.id,

      // Restul datelor pentru afișare
      name: product.nume,
      currency: 'RON',
      image: product.imagineUrl || '',
    };
    addItem(itemToAdd);
    toast.success(`${product.nume} a fost adăugat în coș!`);
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col border border-gray-700">
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
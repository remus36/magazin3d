// in: components/ProductCard.tsx

"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from 'react-hot-toast';
import { SimplifiedProduct } from "@/types";

export default function ProductCard({ product }: { product: SimplifiedProduct }) {
  const { addItem } = useShoppingCart();
  const router = useRouter();

  function handleAddItem(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    
    if (!product.stripePriceId) {
      toast.error("Acest produs nu este disponibil pentru vânzare.");
      return;
    }

    const itemToAdd = {
      id: product.stripePriceId, // ID-ul prețului de la Stripe
      price: product.pret,        // Prețul numeric, pentru afișare
      sku: product.id,            // ID-ul produsului din Sanity, pentru referință
      name: product.nume,
      currency: 'RON',
      image: product.imagineUrl || '',
    };
    
    addItem(itemToAdd);
    toast.success(`${product.nume} a fost adăugat în coș!`);
  }

  function handleCardClick() {
    if (product.slug) {
      router.push(`/magazin/${product.slug}`);
    } else {
      console.error("Navigare eșuată: Produsul nu are un slug definit.", product);
      toast.error("Nu se poate naviga la acest produs.");
    }
  }

  return (
    <div 
      onClick={handleCardClick}
      className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col border border-gray-700 hover:border-cyan-500 transition-colors duration-300 cursor-pointer"
    >
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
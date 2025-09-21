"use client"; // Această componentă este interactivă

import Image from 'next/image';
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from 'react-hot-toast'; // Vom instala asta imediat

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useShoppingCart();

  function handleAddItem() {
    const itemToAdd = {
      // ATENȚIE: Aici trebuie să pui ID-ul PREȚULUI din Stripe, nu ID-ul produsului
      price: product.fields.pret, // Trebuie să adaugi acest câmp în Contentful
      name: product.fields.nume,
      currency: 'RON',
      image: 'https:' + product.fields.imagineProdus.fields.file.url,
      // Folosește ID-ul de la Contentful ca ID unic al produsului
      sku: product.sys.id,
    };
    addItem(itemToAdd);
    toast.success(`${product.fields.numeProdus} a fost adăugat în coș!`);
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col">
      {/* ... Partea de imagine ... */}
      <div className="p-4 ...">
        {/* ... Partea de nume și preț ... */}
        <button 
          onClick={handleAddItem}
          className="mt-4 w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors"
          >
          Adaugă în coș
        </button>
      </div>
    </div>
  );
}
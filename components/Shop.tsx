// in components/Shop.tsx

import { SimplifiedProduct } from "@/types"; // Importăm tipul
import ProductCard from "./ProductCard"; // Refolosim componenta ProductCard!
import Link from "next/link";

// Definim ce 'props' primește componenta
interface ShopProps {
  products: SimplifiedProduct[];
}

export default function Shop({ products }: ShopProps) {
  return (
    <section id="shop" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Produse Populare</h2>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Nu sunt produse de afișat momentan.</p>
        )}

         <div className="text-center mt-12">
           <Link href="/magazin" className="border border-cyan-500 text-cyan-500 font-bold py-3 px-8 rounded-md hover:bg-cyan-500 hover:text-white transition-colors">
             Descoperă tot magazinul
           </Link>
        </div>
      </div>
    </section>
  );
}
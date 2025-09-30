// in app/magazin/page.tsx

import { Metadata } from 'next';
import { client, urlFor } from '@/lib/sanityClient';
import ProductCard from '@/components/ProductCard';
import { SanityProduct, SimplifiedProduct } from '@/types'; // Importă ambele tipuri


export const metadata: Metadata = {
  title: 'Magazin - Sanity.io',
  description: 'Descoperă toate creațiile noastre unice.',
};

// Acum, funcția getProducts va returna un array de 'SimplifiedProduct'
async function getProducts(): Promise<SimplifiedProduct[]> {
  const query = `*[_type == "product"]{
    _id,
    nume,
    pret,
    stripePriceId,
    "slug": slug.current,
    "imagineProdus": imagineProdus,
  }`;

  try {
    const sanityProducts: SanityProduct[] = await client.fetch(query);
    
    
    // Asigurăm că datele se potrivesc cu tipul nostru
const cleanedProducts: SimplifiedProduct[] = sanityProducts.map((product: SanityProduct) => ({
  id: product._id,
  nume: product.nume,
  pret: product.pret,
  stripePriceId: product.stripePriceId,
  slug: product.slug.current, // <-- AICI ESTE CORECȚIA!
  imagineUrl: product.imagineProdus ? urlFor(product.imagineProdus).width(500).url() : null,
}));
    
    return cleanedProducts;
  } 
    catch (error) {
    console.error("Eroare la preluarea datelor din Sanity:", error);
    return [];
  }
}

export default async function MagazinPage() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    // ...
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold">Magazinul Nostru</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* PASUL 2: Spunem explicit că 'product' este de tip 'SimplifiedProduct' */}
        {products.map((product: SimplifiedProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>
  );
}
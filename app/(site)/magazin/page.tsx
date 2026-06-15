// in: app/magazin/page.tsx

export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { client, urlFor } from '@/lib/sanityClient';
import ProductCard from '@/components/ProductCard';
import { SanityProduct, SimplifiedProduct } from '@/types';

export const metadata: Metadata = {
  title: 'Magazin - PixelForge 3D',
  description: 'Descoperă toate creațiile noastre unice, printate 3D, disponibile pentru vânzare.',
};

async function getProducts(): Promise<SimplifiedProduct[]> {
  // --- MODIFICAREA 1: Simplificăm interogarea ---
  // Preluăm întregul obiect 'slug', nu doar 'slug.current'.
  // Asta ne permite să inspectăm ce primim, chiar dacă 'current' lipsește.
  const query = `*[_type == "product"]{
    _id,
    nume,
    pret,
    stripePriceId,
    slug, // Am scos .current de aici
    imagineProdus
  }`;

  try {
    const sanityProducts: SanityProduct[] = await client.fetch(query);

    if (!sanityProducts || sanityProducts.length === 0) {
      return [];
    }

    // --- MODIFICAREA 2: Facem maparea mai sigură ---
    const cleanedProducts: SimplifiedProduct[] = sanityProducts.map((product: SanityProduct) => {
      // Verificăm explicit dacă 'product.slug' și 'product.slug.current' există.
      const slugValue = product.slug && product.slug.current ? product.slug.current : '';
      
      // Dacă slug-ul este gol, afișăm un avertisment în terminalul de pe server.
      if (!slugValue) {
        console.warn(`AVERTISMENT: Produsul "${product.nume}" (ID: ${product._id}) nu are un slug generat în Sanity!`);
      }
      
      return {
        id: product._id,
        nume: product.nume,
        pret: product.pret,
        stripePriceId: product.stripePriceId,
        slug: slugValue, // Folosim valoarea sigură
        imagineUrl: product.imagineProdus ? urlFor(product.imagineProdus).width(500).url() : null,
      };
    });

    return cleanedProducts;
  } catch (error) {
    console.error("Eroare la preluarea produselor din Sanity:", error);
    return [];
  }
}

export default async function MagazinPage() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">Momentan nu sunt produse disponibile.</h1>
        <p className="text-xl mt-4 text-gray-400">
          Verifică dacă ai adăugat și publicat produse în panoul de administrare Sanity.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold">Magazinul Nostru</h1>
        <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
          Descoperă toate creațiile noastre unice, modelate cu pasiune și printate cu precizie.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: SimplifiedProduct) => (
          <ProductCard key={product.id} product={product} />
   
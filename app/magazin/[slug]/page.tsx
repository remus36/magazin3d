// in app/magazin/[slug]/page.tsx

import { client, urlFor } from "@/lib/sanityClient";
import { SimplifiedProduct } from "@/types";
import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn"; // Vom crea această componentă client imediat

// Funcție pentru a prelua datele unui singur produs pe baza slug-ului
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    nume,
    descriere,
    pret,
    stripePriceId,
    "slug": slug.current,
    "imagineProdus": imagineProdus,
    // Putem prelua și o galerie de imagini dacă o definim în Sanity
    // "galerieImagini": galerieImagini,
  }`;

  try {
    const product = await client.fetch(query);
    // Nu mai este nevoie de "curățare" complexă aici, dar generăm URL-ul imaginii
    if (product) {
      product.imagineUrl = product.imagineProdus ? urlFor(product.imagineProdus).url() : null;
    }
    return product;
  } catch (error) {
    console.error("Eroare la preluarea produsului:", error);
    return null;
  }
}

// Props-urile pe care le primește pagina
interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Pagina este o componentă server asincronă
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">Produsul nu a fost găsit.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Coloana de Imagine */}
        <div className="relative w-full h-96 md:h-[500px] bg-gray-800 rounded-lg overflow-hidden">
          {product.imagineUrl && (
            <Image
              src={product.imagineUrl}
              alt={product.nume}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Coloana de Detalii */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{product.nume}</h1>
          <p className="text-3xl font-bold text-cyan-400 mb-6">{product.pret} RON</p>
          <div className="text-gray-300 leading-relaxed prose prose-invert">
            <p>{product.descriere}</p>
          </div>
          
          {/* Butonul de Adăugare în Coș (componentă client separată) */}
          <div className="mt-8">
            <AddToCartBtn product={{
                  _id: product._id,
                  nume: product.nume,
                  pret: product.pret,
                  stripePriceId: product.stripePriceId,
                  imagineUrl: product.imagineUrl
              }} />
          </div>
        </div>
      </div>
    </div>
  );
}
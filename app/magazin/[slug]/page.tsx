// in: app/magazin/[slug]/page.tsx

// Importăm tipurile necesare pentru metadate dinamice
import type { Metadata, ResolvingMetadata } from 'next';
import { client } from "@/lib/sanityClient";
import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn";
import { notFound } from 'next/navigation';

// Funcția getProduct rămâne LA FEL
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id, nume, descriere, pret, stripePriceId, "slug": slug.current, 
    "imagineUrl": imagineProdus.asset->url
  }`;
  try {
    const product = await client.fetch(query);
    return product;
  } catch (error) {
    console.error(`Eroare la preluarea produsului cu slug: ${slug}`, error);
    return null;
  }
}

// Props-urile pe care le primește pagina
type Props = {
  params: { slug: string };
};

// --- ADAUGĂM FUNCȚIA PENTRU METADATE DINAMICE ---
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) {
    return { title: 'Produs negăsit' };
  }
  return {
    title: `${product.nume} - PixelForge 3D`,
    description: product.descriere || 'Detalii despre produs',
  };
}
// ------------------------------------------------

// Acum folosim tipul 'Props' pe care l-am definit
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* ... codul JSX pentru afișarea produsului (rămâne la fel) ... */}
        <div className="relative w-full h-96 md:h-[500px] bg-gray-800 rounded-lg overflow-hidden">
          {product.imagineUrl && (
            <Image
              src={product.imagineUrl}
              alt={product.nume}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{product.nume}</h1>
          <p className="text-3xl font-bold text-cyan-400 mb-6">{product.pret} RON</p>
          <div className="text-gray-300 leading-relaxed prose prose-invert">
            <p>{product.descriere}</p>
          </div>
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
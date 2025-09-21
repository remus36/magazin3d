// app/magazin/page.tsx - Varianta care se conectează la Contentful

import Image from 'next/image';
import { client } from '@/lib/contentfulClient'; // Importăm clientul nostru
import ProductCard from '@/components/ProductCard'

type Product = {
  id: string;
  name: string;
  price: string;
  imgUrl: string; // Vom primi un URL complet de la Contentful
};

// Funcție asincronă pentru a prelua produsele
async function getProductsFromContentful(): Promise<Product[]> {
  try {
    // Cerem toate intrările de tip 'produs' (acesta este API Identifier-ul modelului tău)
    const entries = await client.getEntries({ content_type: 'produs',limit:4 });

    if (entries.items) {
      return entries.items.map(item => {
         const fields = item.fields;
         const imageAsset = fields.imagine as { fields: { file: { url: string } } };

        // Construim un obiect curat pentru fiecare produs
        return {
          id: item.sys.id,
          name: String(fields.nume || 'Nume produs lipsă'), // Convertește explicit la String
          price: String(fields.pret || 'Preț indisponibil'), // Convertește explicit la String
          imgUrl: imageAsset?.fields?.file?.url 
        ? `https:${imageAsset.fields.file.url}` 
        : 'https://placehold.co/400x400/?text=Fara+Imagine',
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Eroare la preluarea datelor de la Contentful: ", error);
    return []; // Returnăm un array gol în caz de eroare pentru a nu strica site-ul
  }
}

export default async function MagazinPage() {
     // === ÎNCEPUTUL BLOCULUI DE DEBUGGING ===
  console.log("--- Începem debugging-ul variabilelor de mediu ---");
  console.log("Valoarea pentru CONTENTFUL_SPACE_ID:", process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
  console.log("Valoarea pentru CONTENTFUL_ACCESS_TOKEN:", process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);
  console.log("-------------------------------------------------");
  // === SFÂRȘITUL BLOCULUI DE DEBUGGING ===
  
  const products = await getProductsFromContentful();

  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen text-white text-center py-20">
        <h1 className="text-4xl">Momentan nu sunt produse disponibile.</h1>
        <p className="text-xl mt-4">Te rugăm să revii mai târziu.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Magazinul Nostru</h1>
        <p className="text-xl text-center text-gray-400 mb-12">Descoperă toate creațiile noastre unice.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {products.map((p) => (
                        <div key={p.id} className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col">
                          <div className="relative w-full h-64">
                            <Image 
                              src={p.imgUrl} // Folosim URL-ul de la Contentful
                              alt={p.name} 
                              fill 
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className="object-cover group-hover:opacity-80 transition-opacity"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow text-center">
                            <h3 className="text-xl font-semibold">{p.name}</h3>
                            <div className="mt-auto pt-4">
                              <p className="mt-2 text-2xl font-bold text-cyan-400">{p.price}</p>
                               <ProductCard key={p.id} product={p} />
                            </div>
                          </div>
                         
                        </div>
                        
                      ))}
        </div>
      </div>
    </div>
  );
}
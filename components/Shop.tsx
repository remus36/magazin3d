import Image from 'next/image';
// Importăm clientul de conectare pe care tocmai l-am creat
import { contentfulClient } from '@/lib/contentfulClient';
import Link from 'next/link';

// Definirea unui tip TypeScript pentru produs ne ajută să evităm greșeli
type Product = {
  id: string;
  name: string;
  price: string;
  imgUrl: string; // Vom primi un URL complet de la Contentful
};

// Funcția care preia produsele de la Contentful
async function getProductsFromContentful(): Promise<Product[]> {
  try {
    // Cerem toate intrările de tip 'produs' (acesta este API Identifier-ul modelului tău)
    const entries = await contentfulClient.getEntries({ content_type: 'produs',limit:4 });

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

// Componenta principală, acum 'async' pentru a putea folosi 'await'
export default async function Shop() {
  const products = await getProductsFromContentful();

  return (
    <section id="shop" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Produse preferate</h2>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-400">Momentan nu sunt produse disponibile.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                    <button className="mt-4 w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors">Adaugă în coș</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
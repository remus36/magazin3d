import Image from 'next/image';
import Link from 'next/link'; // Importăm Link pentru navigare
import { contentfulClient } from '@/lib/contentfulClient';
import Header from '@/components/Header'; // Reutilizăm componentele
import Footer from '@/components/Footer';

// Definirea tipului pentru produs
type Product = {
  id: string;
  name: string;
  price: string;
  imgUrl: string;
};

// Funcție care preia TOATE produsele
async function getAllProducts(): Promise<Product[]> {
  try {
    const entries = await contentfulClient.getEntries({ content_type: 'produs' });
    // FĂRĂ 'limit' aici!

    if (entries.items) {
      return entries.items.map(item => {
        const fields = item.fields as any;
        const imageAsset = fields.imagine as any;
        return {
          id: item.sys.id,
          name: fields.nume || 'Nume produs lipsă',
          price: fields.pret || 'Preț indisponibil',
          imgUrl: imageAsset?.fields?.file?.url ? `https:${imageAsset.fields.file.url}` : 'https://placehold.co/400x400/?text=Fara+Imagine',
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Eroare la preluarea tuturor produselor: ", error);
    return [];
  }
}

// Aceasta este componenta pentru pagina /magazin
export default async function MagazinPage() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <main className="bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">Toate Produsele</h1>
          <p className="text-center text-gray-400 mb-12">Explorează colecția completă de creații 3D.</p>

          {products.length === 0 ? (
            <p className="text-center text-gray-400">Momentan nu sunt produse disponibile.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Aici refolosim exact același cod de afișare a cardurilor de produs */}
              {products.map((p) => (
                <div key={p.id} className="bg-gray-800 rounded-lg overflow-hidden group flex flex-col">
                  <div className="relative w-full h-64">
                    <Image 
                      src={p.imgUrl} 
                      alt={p.name} 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow text-center">
                    <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                    <div className="mt-auto pt-4">
                      <p className="mt-2 text-2xl font-bold text-cyan-400">{p.price}</p>
                      <button className="mt-4 w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors">Adaugă în coș</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
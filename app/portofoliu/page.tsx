import Image from 'next/image';
import { contentfulClient } from '@/lib/contentfulClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Definirea tipului pentru proiect
type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

// Funcție care preia TOATE proiectele
async function getAllProjects(): Promise<Project[]> {
  try {
    const entries = await contentfulClient.getEntries({ content_type: 'proiectPortofoliu' });

    if (entries.items) {
      return entries.items.map(item => {
        const fields = item.fields as any;
        const imageAsset = fields.imaginePrincipala as any;
        return {
          id: item.sys.id,
          title: fields.titlu || 'Titlu proiect lipsă',
          description: fields.descriere || 'Descriere lipsă.',
          imageUrl: imageAsset?.fields?.file?.url ? `https:${imageAsset.fields.file.url}` : 'https://placehold.co/600x400/?text=Fara+Imagine',
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Eroare la preluarea proiectelor: ", error);
    return [];
  }
}

// Componenta pentru pagina /portofoliu
export default async function PortofoliuPage() {
  const projects = await getAllProjects();

  return (
    <>
      <Header />
      <main className="bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">Portofoliu de Proiecte</h1>
          <p className="text-center text-gray-400 mb-12">O selecție a celor mai bune lucrări de modelare și randare 3D.</p>

          {projects.length === 0 ? (
            <p className="text-center text-gray-400">Momentan nu sunt proiecte de afișat.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <div key={p.id} className="bg-gray-800 rounded-lg overflow-hidden group">
                  <div className="relative w-full h-80">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-cyan-400">{p.title}</h3>
                    <p className="mt-2 text-gray-400">{p.description}</p>
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
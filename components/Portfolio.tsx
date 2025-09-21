import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/contentfulClient';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

async function getFeaturedProjects(): Promise<Project[]> {
    try {
        const entries = await client.getEntries({ 
            content_type: 'proiectPortofoliu',
            limit: 3,
            order: ['-sys.createdAt']
        });

        if (!entries.items) {
            return [];
        }

        return entries.items.map(item => {
            const fields = item.fields;
           const imageAsset = fields.imaginePrincipala as { fields: { file: { url: string } } };

            // Simplificăm logica pentru descriere
            let shortDescription = 'Descriere lipsă.';
            if (fields.descriere && typeof fields.descriere === 'string') {
                shortDescription = fields.descriere.substring(0, 70) + '...';
            }

            return {
                id: item.sys.id,
                title: String(fields.titlu || 'Titlu proiect lipsă'), // Convertește explicit la String
                description: String(fields.descriere || 'Descriere lipsă.'), // Convertește explicit la String
                imageUrl: imageAsset?.fields?.file?.url ? `https:${imageAsset.fields.file.url}` : 'https://placehold.co/600x400/?text=Fara+Imagine',
            };
        });
    } catch (error) {
        console.error("Eroare la preluarea proiectelor: ", error);
        return [];
    }
}

export default async function Portfolio() {
  const projects = await getFeaturedProjects();

  return (
    <section id="portfolio" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Proiectele mele</h2>
        
        {projects.length === 0 ? (
            <p className="text-center text-gray-400">Nu sunt proiecte de afișat în portofoliu.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((p) => (
                    <div key={p.id} className="bg-gray-900 rounded-lg overflow-hidden group">
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

        <div className="text-center mt-12">
           <Link href="/portofoliu" className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-transform transform hover:scale-105">
             Vezi toate proiectele
           </Link>
        </div>
      </div>
    </section>
  );
}
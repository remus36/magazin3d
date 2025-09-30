// in app/portofoliu/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanityClient';
// Importăm tipurile necesare
import { SanityProject, SimplifiedProject } from '@/types'; 

export const metadata: Metadata = {
  title: 'Portofoliu - PixelForge 3D',
  description: 'O selecție a celor mai bune proiecte de modelare 3D.',
};

// Adăugăm tipurile Promise<...> pentru a fi expliciți
async function getProjects(): Promise<SimplifiedProject[]> {
  const query = `*[_type == "project"]{
    _id,
    titlu,
    "slug": slug.current,
    descriereScurta,
    "imagineProiect": imagineProiect
  }`;

  try {
    // Aplicăm tipul SanityProject la rezultatul fetch
    const sanityProjects: SanityProject[] = await client.fetch(query);

    // Aplicăm tipul SanityProject la parametrul .map()
    const cleanedProjects: SimplifiedProject[] = sanityProjects.map((project: SanityProject) => ({
      id: project._id,
      titlu: project.titlu,
      slug: project.slug.current,
      descriereScurta: project.descriereScurta,
      imagineUrl: project.imagineProiect ? urlFor(project.imagineProiect).width(600).url() : null,
    }));

    return cleanedProjects;
  } catch (error) {
    console.error("Eroare la preluarea proiectelor din Sanity:", error);
    return [];
  }
}

export default async function PortofoliuPage() {
  const projects = await getProjects();

  // ... restul codului rămâne identic ...
  if (!projects || projects.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">Momentan nu sunt proiecte de afișat.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold">Portofoliul Meu</h1>
        <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
          O colecție de proiecte care demonstrează pasiunea și abilitățile mele în modelarea 3D.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: SimplifiedProject) => ( // Aici folosim tipul curățat
          <Link href={`/portofoliu/${project.slug}`} key={project.id} className="bg-gray-800 rounded-lg overflow-hidden group border border-gray-700 hover:border-cyan-500 transition-all">
            <div className="relative w-full h-80 bg-gray-700">
              {project.imagineUrl && (
                <Image
                  src={project.imagineUrl}
                  alt={project.titlu}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-cyan-400">{project.titlu}</h3>
              <p className="mt-2 text-gray-400">{project.descriereScurta}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
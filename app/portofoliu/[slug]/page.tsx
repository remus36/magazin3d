// in: app/portofoliu/[slug]/page.tsx

import { client } from "@/lib/sanityClient"; // Am scos importurile nefolosite 'urlFor' și 'PortableText'
import Image from "next/image";
import { notFound } from "next/navigation"; // Folosim notFound pentru a returna o pagină 404 reală

/**
 * Funcție pentru a prelua datele unui singur proiect din Sanity.
 */
async function getProject(slug: string) {
  // Interogarea GROQ pentru a prelua detaliile proiectului
  const query = `*[_type == "project" && slug.current == "${slug}"][0]{
    _id,
    titlu,
    descriereScurta,
    descriereCompleta,
    "imagineUrl": imagineProiect.asset->url
  }`;

  try {
    const project = await client.fetch(query);
    return project;
  } catch (error) {
    console.error(`Eroare la preluarea proiectului cu slug: ${slug}`, error);
    return null; // Returnăm null în caz de eroare la fetch
  }
}

// Props-urile pe care le primește pagina de la Next.js
interface ProjectPageProps {
  params: {
    slug: string;
  };
}

/**
 * Componenta de pagină dinamică pentru afișarea detaliilor unui proiect.
 */
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  // Dacă proiectul nu este găsit, randăm pagina 404 standard a Next.js
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      
      {/* Layout de două coloane pentru ecrane medii și mai mari */}
      <div className="md:flex md:gap-12 lg:gap-16">
        
        {/* Coloana Stânga: Imaginea (50% lățime) */}
        <div className="md:w-1/2">
          <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            {project.imagineUrl ? (
              <Image
                src={project.imagineUrl}
                alt={project.titlu}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority // Marcam imaginea ca fiind importantă pentru performanță
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Imagine indisponibilă
              </div>
            )}
          </div>
        </div>

        {/* Coloana Dreapta: Descrierea (50% lățime) */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">{project.titlu}</h1>
          
          <p className="text-xl text-gray-400 mb-6">{project.descriereScurta}</p>
          
          <hr className="border-gray-700 my-6" />

          {/* Descrierea completă */}
          <div className="prose prose-invert lg:prose-lg text-gray-300 max-w-none">
            {/* Afișăm descrierea completă ca text simplu.
                Tag-ul <p> este adăugat pentru consistență stilistică. */}
            <p>{project.descriereCompleta}</p>
          </div>
        </div>

      </div>
      
    </div>
  );
}
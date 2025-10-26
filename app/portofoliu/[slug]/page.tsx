// in: app/portofoliu/[slug]/page.tsx

import { client, urlFor } from "@/lib/sanityClient";
import Image from "next/image";
import { PortableText } from '@portabletext/react'; // Opțional, pentru text bogat

// Funcția getProject rămâne la fel ca înainte
async function getProject(slug: string) {
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
    return null;
  }
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">Proiectul nu a fost găsit.</h1>
      </div>
    );
  }

  return (
    // Container principal care va alinia elementele pe verticală pe ecrane mici
    <div className="container mx-auto px-6 py-12 flex-center">
           
      
      {/* --- ÎNCEPUTUL NOULUI LAYOUT CU FLEXBOX --- */}
      {/* `md:flex` - aplică Flexbox doar pe ecrane medii și mai mari */}
      <div className="md:flex md:gap-12 lg:gap-16">
        
        {/* Coloana Stânga: Imaginea (50% lățime pe ecrane mari) */}
        <div className="md:w-1/2">
          <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden">
            {project.imagineUrl && (
              <Image
                src={project.imagineUrl}
                alt={project.titlu}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          {/* Aici poți adăuga o galerie de imagini thumbnail sub imaginea principală, dacă dorești */}
        </div>

        {/* Coloana Dreapta: Descrierea (50% lățime pe ecrane mari) */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{project.titlu}</h1>
          
          <p className="text-xl text-gray-400 mb-6">{project.descriereScurta}</p>
          
          {/* Linia de separare */}
          <hr className="border-gray-700 my-6" />

          {/* Descrierea completă */}
          <div className="prose prose-invert lg:prose-lg text-gray-300">
            {/* Dacă 'descriereCompleta' este text simplu ('text' în Sanity) */}
            <p>{project.descriereCompleta}</p>

            {/* DACĂ vei schimba 'descriereCompleta' în 'blockContent' în Sanity, vei folosi asta: */}
            {/* <PortableText value={project.descriereCompleta} /> */}
          </div>
        </div>

      </div>
      {/* --- SFÂRȘITUL NOULUI LAYOUT CU FLEXBOX --- */}
      
    </div>
  );
}
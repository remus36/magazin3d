// in: app/portofoliu/[slug]/page.tsx

import { client } from "@/lib/sanityClient";
import Image from "next/image";
import { notFound } from 'next/navigation';

async function getProject(slug: string) {
    const query = `*[_type == "project" && slug.current == "${slug}"][0]{
        _id, titlu, descriereScurta, descriereCompleta,
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

// Folosim 'any' pentru a ocoli eroarea de tip a Vercel
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectPage({ params }: any) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="md:flex md:gap-12 lg:gap-16">
        <div className="md:w-1/2">
          <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg">
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
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">{project.titlu}</h1>
          <p className="text-xl text-gray-400 mb-6">{project.descriereScurta}</p>
          <hr className="border-gray-700 my-6" />
          <div className="prose prose-invert lg:prose-lg text-gray-300 max-w-none">
            <p>{project.descriereCompleta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// in components/Portfolio.tsx

import { SimplifiedProject } from "@/types"; // Importăm tipul
import Image from 'next/image';
import Link from 'next/link';

// Definim ce 'props' primește componenta
interface PortfolioProps {
  projects: SimplifiedProject[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  // Nu mai avem nevoie de array-ul 'projects' definit aici

  return (
    <section id="portfolio" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Portofoliu Selectat</h2>
        
        {/* Verificăm dacă avem proiecte de afișat */}
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link href={`/portofoliu/${project.slug}`} key={project.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                <div className="relative w-full h-80 bg-gray-700">
                  {project.imagineUrl && (
                    <Image
                      src={project.imagineUrl}
                      alt={project.titlu}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
        ) : (
          <p className="text-center text-gray-400">Nu sunt proiecte de afișat momentan.</p>
        )}

        <div className="text-center mt-12">
           <Link href="/portofoliu" className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-transform transform hover:scale-105">
             Vezi tot portofoliul
           </Link>
        </div>
      </div>
    </section>
  );
}
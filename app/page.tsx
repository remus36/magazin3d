// in app/page.tsx

import { client, urlFor } from "@/lib/sanityClient";
import { SimplifiedProduct, SimplifiedProject,  SanityProduct } from "@/types";

// Importăm componentele-secțiuni
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Shop from "@/components/Shop";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";

// --- Funcții pentru Preluarea Datelor ---

// Funcție pentru a prelua ULTIMELE 3 proiecte
async function getFeaturedProjects(): Promise<SimplifiedProject[]> {
  // `| order(_createdAt desc)` - sortează după data creării, descrescător
  // `[0...3]` - ia primele 3 rezultate (adică de la index 0 la 2)
  const query = `*[_type == "project"] | order(_createdAt desc) [0...3] {
    _id,
    titlu,
    "slug": slug.current,
    descriereScurta,
    "imagineProiect": imagineProiect
  }`;
  try {
    const sanityProjects = await client.fetch(query);
    const cleanedProjects: SimplifiedProject[] = sanityProjects.map((project: any) => ({
      id: project._id,
      titlu: project.titlu,
      slug: project.slug,
      descriereScurta: project.descriereScurta,
      imagineUrl: project.imagineProiect ? urlFor(project.imagineProiect).width(600).url() : null,
    }));
    return cleanedProjects;
  } catch (error) {
    console.error("Eroare la preluarea proiectelor recomandate:", error);
    return [];
  }
}

// Funcție pentru a prelua ULTIMELE 4 produse
async function getFeaturedProducts(): Promise<SimplifiedProduct[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...4] {
    _id,
    nume,
    pret,
    stripePriceId,
    "slug": slug.current,
    "imagineProdus": imagineProdus
  }`;
  try {
    
    const sanityProducts: SanityProduct[] = await client.fetch(query); // Adaugă tipul aici
    const cleanedProducts = sanityProducts.map((product: any) => ({
      id: product._id,
      nume: product.nume,
      pret: product.pret,
      stripePriceId: product.stripePriceId,
      slug: product.slug,
      imagineUrl: product.imagineProdus ? urlFor(product.imagineProdus).width(500).url() : null,
    }));
    return cleanedProducts;
  } catch (error) {
    console.error("Eroare la preluarea produselor recomandate:", error);
    return [];
  }
}

// --- Componenta Paginii Principale ---

export default async function HomePage() {
  // Preluăm datele în paralel pentru eficiență
  const [featuredProjects, featuredProducts] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedProducts(),
  ]);

  return (
    // 'main' este deja în layout, deci nu mai este necesar aici
    <>
      <Hero />
      {/* Pasăm datele preluate către componentele corespunzătoare */}
      <Portfolio projects={featuredProjects} />
      <Shop products={featuredProducts} />
      <About />
      <Process />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
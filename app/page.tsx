// in app/page.tsx

// Asigură-te că toate tipurile necesare sunt importate
import { SanityProject, SanityProduct, SimplifiedProduct, SimplifiedProject } from "@/types"; 
import { client, urlFor } from "@/lib/sanityClient";

// ... importă componentele secțiunilor (Hero, etc.) ...
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Shop from "@/components/Shop";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";

// --- Funcții pentru Preluarea Datelor (CORECTATE) ---

async function getFeaturedProjects(): Promise<SimplifiedProject[]> {
  const query = `*[_type == "project"] | order(_createdAt desc) [0...3] {
    _id, titlu, "slug": slug.current, descriereScurta, "imagineProiect": imagineProiect
  }`;
  try {
    const sanityProjects: SanityProject[] = await client.fetch(query); // Adaugă tipul aici
    const cleanedProjects: SimplifiedProject[] = sanityProjects.map((project: SanityProject) => ({ // Adaugă tipul aici
      id: project._id,
      titlu: project.titlu,
      slug: project.slug.current,
      descriereScurta: project.descriereScurta,
      imagineUrl: project.imagineProiect ? urlFor(project.imagineProiect).width(600).url() : null,
    }));
    return cleanedProjects;
  } catch (error) {
    console.error("Eroare la preluarea proiectelor recomandate:", error);
    return [];
  }
}

async function getFeaturedProducts(): Promise<SimplifiedProduct[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...4] {
    _id, nume, pret, stripePriceId, "slug": slug.current, "imagineProdus": imagineProdus
  }`;
  try {
    const sanityProducts: SanityProduct[] = await client.fetch(query); // Adaugă tipul aici
    const cleanedProducts: SimplifiedProduct[] = sanityProducts.map((product: SanityProduct) => ({ // Adaugă tipul aici
      id: product._id,
      nume: product.nume,
      pret: product.pret,
      stripePriceId: product.stripePriceId,
      slug: product.slug.current,
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
  const [featuredProjects, featuredProducts] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Hero />
      <Portfolio projects={featuredProjects} />
      <Shop products={featuredProducts} />
      <About />
      <Process />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
// in app/page.tsx

export const revalidate = 60; // Regenerează pagina la fiecare 60 de secunde

import { SanityProject, SanityProduct, SimplifiedProduct, SimplifiedProject } from "@/types";
import { client, urlFor } from "@/lib/sanityClient";

import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Shop from "@/components/Shop";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";

// --- Funcții pentru Preluarea Datelor (CORECTATE) ---

async function getFeaturedProjects(): Promise<SimplifiedProject[]> {
  // Preluăm obiectul 'slug' întreg
  const query = `*[_type == "project"] | order(_createdAt desc) [0...3] {
    _id, titlu, slug, descriereScurta, imagineProiect
  }`;
  try {
    const sanityProjects: SanityProject[] = await client.fetch(query);
    const cleanedProjects: SimplifiedProject[] = sanityProjects.map((project: SanityProject) => {
      const slugValue = project.slug && project.slug.current ? project.slug.current : '';
      if (!slugValue) console.warn(`AVERTISMENT (Homepage): Proiectul "${project.titlu}" nu are slug!`);
      return {
        id: project._id,
        titlu: project.titlu,
        slug: slugValue, // Folosim valoarea sigură
        descriereScurta: project.descriereScurta,
        imagineUrl: project.imagineProiect ? urlFor(project.imagineProiect).width(600).url() : null,
      };
    });
    return cleanedProjects;
  } catch (error) {
    console.error("Eroare la preluarea proiectelor recomandate:", error);
    return [];
  }
}

async function getFeaturedProducts(): Promise<SimplifiedProduct[]> {
  // Preluăm obiectul 'slug' întreg
  const query = `*[_type == "product"] | order(_createdAt desc) [0...4] {
    _id, nume, pret, stripePriceId, slug, imagineProdus
  }`;
  try {
    const sanityProducts: SanityProduct[] = await client.fetch(query);
    const cleanedProducts: SimplifiedProduct[] = sanityProducts.map((product: SanityProduct) => {
      const slugValue = product.slug && product.slug.current ? product.slug.current : '';
      if (!slugValue) console.warn(`AVERTISMENT (Homepage): Produsul "${product.nume}" nu are slug!`);
      return {
        id: product._id,
        nume: product.nume,
        pret: product.pret,
        stripePriceId: product.stripePriceId,
        slug: slugValue, // Folosim valoarea sigură
        imagineUrl: product.imagineProdus ? urlFor(product.imagineProdus).width(500).url() : null,
      };
    });
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
      <About /
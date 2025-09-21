import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Shop from "@/components/Shop";
import About from "@/components/About";
import Process from "@/components/Process";
// import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";


export default function HomePage() {
  return (
    // Folosim un div wrapper pentru a evita aplicarea stilului direct pe main
    // pentru a avea mai mult control.
    <div>
 
      <main>
        <Hero />
        <Portfolio />
        <Shop />
        <About />
        <Process />
       
        <ContactCTA />
      </main>
   
    </div>
  );
}
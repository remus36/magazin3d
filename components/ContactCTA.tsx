import Link from 'next/link'; // Adaugă importul

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-cyan-600">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-extrabold text-white">Ai un proiect personalizat în minte?</h2>
        <p className="mt-4 text-lg text-cyan-100 max-w-2xl mx-auto">
          Sunt aici să te ajut să o transformi în realitate. Contactează-mă pentru o ofertă personalizată folosind pagina de contact.
        </p>
        <div className="mt-8">
          {/* Folosim Link în loc de <a> */}
          <Link
            href="/contact"
            className="bg-white text-cyan-700 font-bold py-3 px-10 rounded-md hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg"
          >
            Mergi la Pagina de Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
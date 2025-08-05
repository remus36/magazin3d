export default function ContactCTA() {
  return (
    <section id="contact" className="bg-cyan-600">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-extrabold text-white">Ai un proiect personalizat în minte?</h2>
        <p className="mt-4 text-lg text-cyan-100 max-w-2xl mx-auto">
          Indiferent dacă ai o schiță, un fișier 3D sau doar o idee, sunt aici să te ajut să o transformi în realitate. Contactează-mă pentru o ofertă personalizată.
        </p>
        <div className="mt-8">
          <a 
            href="mailto:contact@adresa-ta.com" // Important: înlocuiește cu adresa ta de email!
            className="bg-white text-cyan-700 font-bold py-3 px-10 rounded-md hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg"
          >
            Cere o Ofertă
          </a>
        </div>
      </div>
    </section>
  );
}
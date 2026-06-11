import Image from "next/image";

export default function About() {
  return (
    // Sectiunea principala, am adaugat putin spatiu pe verticala (py-20)
    <section id="about" className="py-20 bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6">

        {/* --- Sectiunea Introductiva (cea existenta) --- */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <Image
              src="/images/remusA.jpg" // Asigura-te ca aceasta cale este corecta!
              alt="Remus, specialist in modelare 3D" 
              width={500} 
              height={500}
              className="rounded-full shadow-lg mx-auto transform hover:scale-105 transition-transform duration-300" 
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold text-cyan-400 mb-2">Despre Mine</h2>
            <p className="mt-4 text-lg">
              Salut! Sunt Remus, un pasionat de tehnologie și design, specializat în modelare 3D și printare. Pasiunea mea este să transform concepte digitale complexe în obiecte tangibile, fie că este vorba de prototipuri funcționale, piese de artă sau produse unice.
            </p>
            <p className="mt-4 text-gray-400">
              Folosesc software de top precum Blender, Fusion 360 și programe de AI pentru a crea modele detaliate și precise, pe care le aduc la viață cu ajutorul imprimantelor 3D de înaltă rezoluție.
            </p>
          </div>
        </div>

        {/* --- Sectiunea Adaugata: Viziune si Abordare --- */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-cyan-400">Filosofia Mea de Lucru</h3>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            {/* Card 1: Precizie */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
              <h4 className="text-xl font-semibold text-white">Precizie și Detaliu</h4>
              <p className="mt-2 text-gray-400">
                Fiecare model este o provocare de a atinge perfecțiunea. Mă concentrez pe detalii fine și pe o execuție tehnică impecabilă pentru a asigura un produs final de cea mai înaltă calitate.
              </p>
            </div>
            {/* Card 2: Inovatie */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
              <h4 className="text-xl font-semibold text-white">Inovație Continuă</h4>
              <p className="mt-2 text-gray-400">
                Lumea tehnologiei 3D este într-o continuă evoluție. Explorez constant noi tehnici, materiale și software-uri pentru a împinge limitele posibilului și a oferi soluții creative.
              </p>
            </div>
            {/* Card 3: Colaborare */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
              <h4 className="text-xl font-semibold text-white">Parteneriat cu Clientul</h4>
              <p className="mt-2 text-gray-400">
                Cred într-o comunicare deschisă și o colaborare strânsă. Îmi place să înțeleg viziunea clienților mei și să lucrez împreună cu ei pentru a transforma ideile în realitate.
              </p>
            </div>
          </div>
        </div>
        
        {/* --- Sectiunea Adaugata: Call to Action --- */}
        <div className="mt-20 text-center bg-gray-900 p-10 rounded-lg shadow-2xl border border-gray-700">
          <h3 className="text-3xl font-bold text-cyan-400">Să Creăm Ceva Împreună!</h3>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Ai o idee pe care vrei să o aduci la viață? Fie că ai nevoie de un prototip, un obiect personalizat sau consultanță în printare 3D, sunt aici să te ajut.
          </p>
          <a 
            href="/contact" // Poti schimba link-ul catre pagina de contact
            className="mt-6 inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-600 transition-colors duration-300 transform hover:scale-105"
          >
            Contactează-mă
          </a>
        </div>

      </div>
    </section>
  );
}
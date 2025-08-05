export default function Hero() {
  return (
    <section 
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg2.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider text-white">
          Unde <span className="text-cyan-400">Visele</span> Prind Formă
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          De la modele 3D complexe la obiecte fizice printate cu precizie, aducem viziunea ta la viață.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#portfolio" className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-transform transform hover:scale-105">
            Vezi Portofoliul
          </a>
          <a href="#shop" className="bg-gray-700 text-white font-bold py-3 px-8 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-105">
            Mergi la Magazin
          </a>
        </div>
      </div>
    </section>
  );
}
export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3">
          <img src="/images/remus.jpg" alt="Your Name" className="rounded-full shadow-lg mx-auto" />
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-4xl font-bold text-cyan-400">Despre Mine</h2>
          <p className="mt-4 text-lg text-gray-300">
            Salut! Sunt Remus, un pasionat de tehnologie și design, specializat în modelare 3D și printare. Pasiunea mea este să transform concepte digitale complexe în obiecte tangibile, fie că este vorba de prototipuri funcționale, piese de artă sau produse unice.
          </p>
          <p className="mt-4 text-gray-400">
            Folosesc software de top precum Blender, Fusion 360 și programe de AI pentru a crea modele detaliate și precise, pe care le aduc la viață cu ajutorul imprimantelor 3D de înaltă rezoluție.
          </p>
        </div>
      </div>
    </section>
  );
}
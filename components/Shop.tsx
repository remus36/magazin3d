export default function Shop() {
  const products = [
    { name: "Figurină Dragon Articulat", price: "120 RON", img: "/images/dragona.png" },
    { name: "Suport Căști Gamer", price: "85 RON", img: "/images/standa.png" },
    { name: "Vază Geometrică Minimalistă", price: "95 RON", img: "/images/vasa.png" },
    { name: "Organizator Birou Tech", price: "70 RON", img: "/images/organisera.png" },
  ];

  return (
    <section id="shop" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Produse populare</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p, i) => (
             <div key={i} className="bg-gray-800 rounded-lg overflow-hidden group text-center text-white">
               <img src={p.img} alt={p.name} className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity"/>
               <div className="p-4 flex flex-col flex-grow text-center">
                 <h3 className="text-xl font-semibold">{p.name}</h3>
                 <div className="mt-auto pt-4">
                 <p className="mt-2 text-2xl font-bold text-cyan-400">{p.price}</p>
                 <button className="mt-4 w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors">Adaugă în coș</button>
               </div>
               </div>
             </div>
          ))}
        </div>
         <div className="text-center mt-12">
           <a href="#" className="border border-cyan-500 text-cyan-500 font-bold py-3 px-8 rounded-md hover:bg-cyan-500 hover:text-white transition-colors">Descoperă tot magazinul</a>
        </div>
      </div>
    </section>
  );
}
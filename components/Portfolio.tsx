export default function Portfolio() {
  const projects = [
    { title: "Model personanaje personalizate", desc: "Peronaje create la cerere.", img: "/images/ben.png" },
    { title: "Prototip produs industrial", desc: "Design funcțional pentru testare.", img: "/images/parts.png" },
    { title: "Randare arhitecturală", desc: "Vizualizare 3D a unei clădiri moderne.", img: "/images/casa.png" },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Portofoliu </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="bg-gray-900 rounded-lg overflow-hidden group">
              <img src={p.img} alt={p.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"/>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-cyan-400">{p.title}</h3>
                <p className="mt-2 text-gray-400">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
           <a href="#" className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-transform transform hover:scale-105">Vezi toate proiectele</a>
        </div>
      </div>
    </section>
  );
}
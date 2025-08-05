import { Lightbulb, Scan, PackageCheck, Send } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: <Lightbulb className="h-12 w-12 text-cyan-400" />,
      title: "1. Concept și Modelare 3D",
      desc: "Transformăm orice idee sau schiță într-un model digital detaliat, gata de producție."
    },
    {
      icon: <Scan className="h-12 w-12 text-cyan-400" />,
      title: "2. Printare de Înaltă Precizie",
      desc: "Folosim imprimante 3D de top și materiale de calitate pentru a aduce modelul la viață, strat cu strat."
    },
    {
      icon: <PackageCheck className="h-12 w-12 text-cyan-400" />,
      title: "3. Finisare și Verificare",
      desc: "Fiecare produs este finisat manual și verificat riguros pentru a asigura calitatea maximă."
    },
    {
      icon: <Send className="h-12 w-12 text-cyan-400" />,
      title: "4. Ambalare și Livrare",
      desc: "Produsul tău este ambalat cu grijă și expediat în siguranță direct la ușa ta."
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-900 text-cyan-400">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Procesul Nostru de Lucru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 bg-gray-800 rounded-lg flex flex-col items-center">
              <div className="mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
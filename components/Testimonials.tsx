import Image from 'next/image';

export default function Testimonials() {
  const reviews = [
    {
      quote: "Calitatea printului este excepțională, mult peste așteptări. Recomand cu încredere pentru orice proiect 3D!",
      name: "Andrei Popescu",
      role: "Client verificat",
      avatar: "/images/man1.jpg"
    },
    {
      quote: "Comunicare excelentă pe tot parcursul procesului de modelare. Produsul final a fost exact ce mi-am dorit.",
      name: "Elena Ionescu",
      role: "Client verificat",
      avatar: "/images/woman1.jpg"
    },
     {
      quote: "O figurină personalizată absolut superbă! Detaliile sunt incredibile. Voi reveni cu siguranță pentru alte comenzi.",
      name: "Mihai Georgescu",
      role: "Client verificat",
      avatar: "/images/man2.jpeg"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Ce spun clienții noștri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg flex flex-col">
                <p className="text-gray-300 italic mb-6 flex-grow">{review.quote}</p>
                    <div className="flex items-center">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                        {/* Vei înlocui placeholder-ul cu imaginile clienților sau le poți genera */}
                          <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                        </div>
                        <div>
                        <p className="font-bold text-cyan-400">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                    </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
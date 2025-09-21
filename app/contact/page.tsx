// in app/contact/page.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - PixelForge 3D',
  description: 'Contactează-ne pentru proiecte personalizate sau întrebări.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-center mb-4">Contactează-mă</h1>
      <p className="text-xl text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Ai o întrebare sau vrei să începi un proiect nou? Completează formularul de mai jos și îți voi răspunde în cel mai scurt timp.
      </p>

      {/* Aici începe formularul real, detectabil de Netlify */}
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
        className="max-w-xl mx-auto"
      >
        {/* Input necesar pentru Netlify să știe ce formular este trimis */}
        <input type="hidden" name="form-name" value="contact" />
        
        {/* Câmp "honeypot" pentru a prinde boții. Trebuie să fie ascuns. */}
        <p className="hidden">
          <label>
            Nu completa acest câmp dacă ești om: <input name="bot-field" />
          </label>
        </p>

        {/* Câmpul pentru Nume */}
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Numele tău</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="ex: Andrei Popescu"
          />
        </div>

        {/* Câmpul pentru Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Adresa de email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="ex: andrei.popescu@email.com"
          />
        </div>

        {/* Câmpul pentru Mesaj */}
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Mesajul tău</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder="Descrie aici proiectul tău sau întrebarea pe care o ai..."
          ></textarea>
        </div>

        {/* Butonul de Trimitere */}
        <div className="text-center">
          <button 
            type="submit"
            className="bg-cyan-500 text-white font-bold py-3 px-10 rounded-md hover:bg-cyan-600 transition-transform transform hover:scale-105"
          >
            Trimite Mesajul
          </button>
        </div>
      </form>
    </div>
  );
}
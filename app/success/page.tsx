// Fisier: app/success/page.tsx

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-green-500">Plată Efectuată cu Succes!</h1>
      <p className="text-xl mt-4 text-gray-400">
        Mulțumim pentru comanda ta. Vei primi în curând un email de confirmare.
      </p>
      <Link href="/magazin" className="mt-8 inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600">
        Continuă Cumpărăturile
      </Link>
    </div>
  );
}
// Fisier: app/cancel/page.tsx

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-red-500">Plata a fost Anulată</h1>
      <p className="text-xl mt-4 text-gray-400">
        Comanda ta nu a fost procesată. Produsele sunt încă în coșul tău.
      </p>
      <Link href="/magazin" className="mt-8 inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600">
        Înapoi la Magazin
      </Link>
    </div>
  );
}
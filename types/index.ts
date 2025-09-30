export interface SimplifiedProduct {
  id: string;
  nume: string;
  pret: number;
  stripePriceId: string;
  slug: string; // <-- Trebuie să fie 'string', NU '{ current: string }'
  imagineUrl: string | null;
}

export interface SimplifiedProject {
  id: string;
  titlu: string;
  slug: string;
  descriereScurta: string;
  imagineUrl: string | null;
}


// Tip pentru datele brute primite de la Sanity pentru un produs
export interface SanityProduct {
  _id: string;
  nume: string;
  pret: number;
  stripePriceId: string;
  slug: { current: string };
  imagineProdus: any; // Imaginea este un obiect complex, îl lăsăm 'any' deocamdată, dar într-un context controlat
}

// Tip pentru datele brute primite de la Sanity pentru un proiect
export interface SanityProject {
    _id: string;
    titlu: string;
    slug: { current: string };
    descriereScurta: string;
    imagineProiect: any;
}

export interface SanityProduct {
  _id: string;
  nume: string;
  pret: number;
  stripePriceId: string;
  slug: { current: string };
  imagineProdus: any; // Lasăm 'any' aici, este un obiect complex controlat
}

// Tip pentru datele brute primite de la Sanity pentru un proiect
export interface SanityProject {
    _id: string;
    titlu: string;
    slug: { current: string };
    descriereScurta: string;
    imagineProiect: any;
}
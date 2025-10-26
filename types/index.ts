// Fisierul 'types.ts' CORECTAT și CURAT

export interface SimplifiedProduct {
  id: string;
  nume: string;
  pret: number;
  stripePriceId: string;
  slug: string;
  imagineUrl: string | null;
}

export interface SimplifiedProject {
  id: string;
  titlu: string;
  slug: string;
  descriereScurta: string;
  imagineUrl: string | null;
}

// Tip pentru datele brute primite de la Sanity pentru un PRODUS
export interface SanityProduct {
  _id: string;
  nume: string;
  pret: number;
  stripePriceId: string;
  slug: { current: string };
  imagineProdus: any;
}

// Tip pentru datele brute primite de la Sanity pentru un PROIECT
export interface SanityProject {
    _id: string;
    titlu: string;
    slug: { current: string };
    descriereScurta: string;
    imagineProiect: any;
}
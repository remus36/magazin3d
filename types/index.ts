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
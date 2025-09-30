// in: lib/sanityAdminClient.ts

import { createClient } from '@sanity/client';

// Verificăm dacă variabilele de mediu necesare există
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_WRITE_TOKEN; // Folosim token-ul de SCRIERE

if (!projectId || !dataset || !apiVersion || !token) {
  throw new Error('Variabilele de mediu pentru clientul de administrare Sanity nu sunt definite!');
}

// Acest client este special pentru ACȚIUNI DE ADMINISTRARE (creare, actualizare)
// El NU ar trebui importat NICIODATATĂ în componente care ajung în browser.
export const sanityAdminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // OBLIGATORIU 'false' pentru operațiuni de scriere
  token,         // Folosim token-ul cu permisiuni de scriere
});
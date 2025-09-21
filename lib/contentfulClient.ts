// in lib/contentfulClient.ts

import { createClient } from 'contentful';

// 1. Citește variabilele de mediu direct din `process.env`
// Acest cod rulează pe server, deci folosim numele FĂRĂ prefixul 'NEXT_PUBLIC_'.
// Este metoda modernă și sigură.
const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// 2. Verifică dacă variabilele au fost găsite
if (!space || !accessToken) {
  // Aruncă o eroare clară dacă variabilele lipsesc.
  // Acest mesaj va apărea în terminal/log-uri dacă ai uitat să le definești.
  throw new Error("Variabilele de mediu CONTENTFUL_SPACE_ID și CONTENTFUL_ACCESS_TOKEN trebuie definite!");
}

// 3. Creează și exportă clientul
// Folosim un export numit 'client' pentru a fi consistent.
export const client = createClient({
  space: space,
  accessToken: accessToken,
});
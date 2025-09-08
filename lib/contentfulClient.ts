import { createClient } from 'contentful';
import getConfig from 'next/config';

// 1. Preluăm configurarea publică din Next.js
const { publicRuntimeConfig } = getConfig();

// 2. Extragem variabilele de acolo
const spaceId = publicRuntimeConfig.contentfulSpaceId;
const accessToken = publicRuntimeConfig.contentfulAccessToken;

// 3. Verificăm dacă există
if (!spaceId || !accessToken) {
  throw new Error("Eroare: Variabilele de mediu pentru Contentful (SPACE_ID și ACCESS_TOKEN) nu sunt definite în next.config.js!");
}

// 4. Creăm clientul folosind aceste variabile
export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});
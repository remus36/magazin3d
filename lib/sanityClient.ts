// Fisier: lib/sanityClient.ts

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // CDN dezactivat pentru date live
  token: process.env.SANITY_API_TOKEN,
});

// Helper pentru a genera URL-uri de imagini optimizate
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
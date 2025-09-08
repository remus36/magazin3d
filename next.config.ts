import type { NextConfig } from 'next'

const config: NextConfig = {
  // Adăugăm această secțiune nouă
  publicRuntimeConfig: {
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  
  // Restul configurării rămâne la fel
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'placehold.co',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.ctfassets.net',
      },
    ],
  },
}

export default config
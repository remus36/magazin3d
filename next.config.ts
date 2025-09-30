import type { NextConfig } from 'next'

const config: NextConfig = {
  // Adăugăm această secțiune nouă
  publicRuntimeConfig: {
    contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
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
       {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Domeniul de unde vin imaginile Sanity
        port: '',
      },
    ],
  },
}

export default config
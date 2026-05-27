import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
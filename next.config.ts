/** @type {import('next').NextConfig} */
const nextConfig = {

 
  output: 'standalone',
  // Aici începe modificarea
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  // Aici se termină modificarea
};

export default nextConfig;
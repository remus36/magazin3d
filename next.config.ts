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
    ],
  },
  // Aici se termină modificarea
};

export default nextConfig;
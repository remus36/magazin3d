/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'export',
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
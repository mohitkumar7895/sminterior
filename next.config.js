/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  optimizeFonts: false,
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'bcryptjs'],
    webpackBuildWorker: false,
  },
};

module.exports = nextConfig;

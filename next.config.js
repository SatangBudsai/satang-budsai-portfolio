/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizePackageImports: ['@heroui/react', '@iconify/react', 'framer-motion', 'recharts', 'swiper']
  }
}

module.exports = nextConfig

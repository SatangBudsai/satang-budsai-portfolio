import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  images: { formats: ['image/avif', 'image/webp'] },
  // The page was renamed from Experiments to Learning.
  redirects: async () => [{ source: '/experiments', destination: '/learning', permanent: true }]
}

export default withNextIntl(nextConfig)

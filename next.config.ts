import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  images: { formats: ['image/avif', 'image/webp'] }
}

export default withNextIntl(nextConfig)

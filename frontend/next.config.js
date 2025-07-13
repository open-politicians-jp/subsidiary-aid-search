/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/subsidiary-aid-search',
  assetPrefix: '/subsidiary-aid-search/',
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
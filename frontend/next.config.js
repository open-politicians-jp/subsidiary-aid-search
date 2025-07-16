/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/subsidiary-aid-search' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/subsidiary-aid-search/' : '',
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/subsidiary-aid-search',
  assetPrefix: '/subsidiary-aid-search/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
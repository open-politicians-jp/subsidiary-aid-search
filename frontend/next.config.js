/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/search_subsidiary_aid' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/search_subsidiary_aid/' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
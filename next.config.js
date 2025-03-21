/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kumi-math' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/kumi-math' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig; 
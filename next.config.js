/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
      formats: ['image/avif', 'image/webp'],
      domains: ['res.cloudinary.com'],
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dzfj34ydk/image/upload/**',
          },
        ]
  }
}

module.exports = nextConfig

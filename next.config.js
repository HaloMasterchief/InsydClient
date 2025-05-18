/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'],
  },
  experimental: {
    // Any experimental options can go here
  },
};

module.exports = nextConfig;

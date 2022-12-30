/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['supermomos-app-resources-us.s3.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/create-post',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

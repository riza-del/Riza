/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Buat optimize di Render
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppresses TypeScript warnings from throwing build errors on the runner
  typescript: {
    ignoreBuildErrors: true,
  },
  // Suppresses ESLint rule violations from throwing build errors on the runner
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

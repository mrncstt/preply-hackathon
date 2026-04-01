/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  async rewrites() {
    const smartcatApi = process.env.SMARTCAT_API_URL || 'http://localhost:8000';
    return [
      {
        source: '/smartcat-api/:path*',
        destination: `${smartcatApi}/:path*`,
      },
    ];
  },
}

export default nextConfig

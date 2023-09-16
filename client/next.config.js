const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const config = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = withBundleAnalyzer(config);

/** @type {import('next').Next Config} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3000/:path*", // Proxy to Backend
      },
    ];
  },
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    API_URL: "http://127.0.0.1:3000",
  },
};



module.exports = nextConfig;

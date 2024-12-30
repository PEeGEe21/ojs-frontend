/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  scope: '/app',
  sw: 'service-worker.js',
  runtimeCaching,
});

module.exports = withPWA({
  reactStrictMode: false,
  
  // Add the images configuration here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aatztzctibcyonrllngy.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader'
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false
      };
    }

    return config;
  }
});
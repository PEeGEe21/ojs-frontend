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
  // other congigs
  reactStrictMode: false,
});


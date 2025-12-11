/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    'http://192.168.0.14:3000',
    'local-origin.dev',
    '*.local-origin.dev'
  ],
};

module.exports = nextConfig;

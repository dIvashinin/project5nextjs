/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Add the context directory to resolve modules
    config.resolve.modules.push(__dirname + '/context');
    return config;
},
}

module.exports = nextConfig

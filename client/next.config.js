/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')();

const nextConfig = {
  // ...options
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'glogglogglog-env.eba-fuksumx7.ap-northeast-2.elasticbeanstalk.com',
      },
    ],
  },
};

module.exports = removeImports({
  ...nextConfig,
});

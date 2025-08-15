/** @type {import('next').NextConfig} */
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './dist',
  webpack(config) {
    config.resolve.alias['@src'] = path.resolve('./src');
    config.resolve.alias['@components'] = path.resolve('./src/components');
    config.resolve.alias['@assets'] = path.resolve('./src/assets');

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default createNextIntlPlugin(nextConfig);

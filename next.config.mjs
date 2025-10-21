// @ts-check
import withPWAInit from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ビルド時に型エラーで停止しない
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintエラーでビルドが止まらないように
    ignoreDuringBuilds: true,
  },
  output: 'standalone', // Firebase HostingやAzureに最適
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push('handlebars');
    }
    return config;
  },
};

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);

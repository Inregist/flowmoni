// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));

import withPWA from 'next-pwa';

// /** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};
const nextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
// @ts-ignore
})(config);

export default nextConfig;

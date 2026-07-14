import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "strapiautomatech.automatechglobal.com", pathname: "/uploads/**" },
    ],
  },
};

export default withNextIntl(nextConfig);

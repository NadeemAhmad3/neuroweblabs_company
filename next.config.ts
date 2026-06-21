import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;

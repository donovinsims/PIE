import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The live menu page used the misspelled slug "broadster". Keep old URLs working.
  async redirects() {
    return [
      { source: "/broadster-chicken", destination: "/broaster-chicken", permanent: true },
    ];
  },
};

export default nextConfig;

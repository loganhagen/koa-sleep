import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.development or .env.production
const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({ path: envPath });

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.EXPRESS_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnvConfig } from "@next/env";

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(projectDir, "..");

// Share backend secrets (OPENAI_API_KEY, DATABASE_URL) with Next.js API routes in local dev.
loadEnvConfig(path.join(repoRoot, "backend"));
loadEnvConfig(projectDir);

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: { root: projectDir },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    remotePatterns: [{ protocol: "https", hostname: "assets.mixkit.co" }],
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;

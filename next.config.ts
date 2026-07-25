import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withIntlayer(nextConfig);

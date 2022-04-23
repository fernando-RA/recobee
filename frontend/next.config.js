const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    runtime: "edge",
    // serverComponents: true,
  },
  productionBrowserSourceMaps: true,
});

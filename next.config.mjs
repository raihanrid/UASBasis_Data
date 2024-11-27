const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
  /* config options here */
};

export default nextConfig;

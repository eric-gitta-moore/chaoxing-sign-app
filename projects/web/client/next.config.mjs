/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
  output: "export",
  swcMinify: true,
  transpilePackages: ["@ionic/react", "@ionic/core", "@stencil/core", "ionicons"],
};

export default nextConfig;

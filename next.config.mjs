/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    return [
      {
        source: "/colors",
        destination: "https://csscolorsapi.com/api/colors",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;

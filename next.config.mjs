/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ✅ disables sharp requirement
  },
};

export default nextConfig;

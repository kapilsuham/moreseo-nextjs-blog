/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
    // NextJS <Image> component needs to whitelist domains for src={}
    // It's set to allow all bt default
    {
      protocol: 'https',
      hostname: '**',
      port: '',
      pathname: '/**',
    }
  ],
},
};
export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "store.bringofresh.net",
      "api.bringodirect.com/api",
      "https://api.bringodirect.com/api",
      "api.bringodirect.com",
    ],
    //  remotePatterns:[
    //   {
    //     protocol:'https',
    //     hostname:'store.api.bringofresh.net'
    //   }
    //  ]
  },
};

export default nextConfig;

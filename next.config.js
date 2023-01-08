/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  env: {
    NEXT_PUBLIC_RPC_HOST: process.env.REACT_APP_SOLANA_RPC_HOST,
    NEXT_PUBLIC_SOLANA_NETWORK: process.env.REACT_APP_NETWORK,
  },
};

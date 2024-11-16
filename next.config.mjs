/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{
            source: '/',
            destination: '/language',
            permanent: true,
        }];
    },
    env: {
        BE_URL: process.env.BE_URL
    }
};

export default nextConfig;

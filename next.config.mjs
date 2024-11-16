/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{
            source: '/',
            destination: '/language',
            permanent: true,
        }];
    }
};

export default nextConfig;

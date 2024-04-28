/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN
    }
};

export default nextConfig;

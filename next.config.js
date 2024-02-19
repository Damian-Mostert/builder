/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.marketing.ium.co",
            },
        ],
    },
}

module.exports = nextConfig

const withVideos = require('next-videos');

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true, // Minify em produção;

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
                pathname: '**'
            }
        ]
    }
}

module.exports = withVideos(nextConfig);
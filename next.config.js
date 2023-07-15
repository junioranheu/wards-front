const withVideos = require('next-videos');

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true, // Minify em produção;

    images: {
        domains: ['localhost']
    }
}

module.exports = withVideos(nextConfig);
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'img.tgdd.vn',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'cdn.tgdd.vn',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '**',
            }
          ],
    }
}

module.exports = nextConfig

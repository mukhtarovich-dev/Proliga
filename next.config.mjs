import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.js',
  swDest: 'public/sw.js',
  scope: '/',
  register: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proliga.uz',
      },
    ],
  },
}

export default withSerwist(nextConfig)

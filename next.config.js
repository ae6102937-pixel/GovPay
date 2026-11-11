/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    // Google AI Studio previews the app inside an iframe, so development allows framing from anywhere.
    // Production must not: it would let any site embed these pages (clickjacking).
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Frame-Options', value: 'ALLOWALL' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
          ],
        },
      ];
    }
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;

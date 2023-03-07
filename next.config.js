/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    GRANT_TYPE: process.env.GRANT_TYPE,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CODE_VERIFIER: process.env.CODE_VERIFIER,
    API_WEB_URL: process.env.API_WEB_URL
  }
}

module.exports = nextConfig

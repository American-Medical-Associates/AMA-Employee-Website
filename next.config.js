const { join } = require('path')
const withTM = require('next-transpile-modules')(['react-syntax-highlighter'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Changes the cache location for Puppeteer.
  // cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
}

module.exports = withTM(nextConfig)

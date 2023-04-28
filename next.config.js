const { join } = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
}

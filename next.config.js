/**
 * @type {import('next').NextConfig}
 */
// import { rewrites } from './routes/rewrite'
const rewrites = require('./routes/rewrites')

const nextConfig = {
  rewrites,
  /* config options here */
}

module.exports = nextConfig
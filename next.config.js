/**
 * @type {import('next').NextConfig}
 */
// import { rewrites } from './routes/rewrite'
const rewrites = require('./routes/rewrites')
const path = require('path')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  rewrites,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    authApi: process.env.AUTH_API_SERVER || 'http://admin.last6.local',
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    authApi: process.env.AUTH_API || 'http://admin.last6.local',
  },
  /* config options here */
}

module.exports = nextConfig
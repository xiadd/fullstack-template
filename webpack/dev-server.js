const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const webpackDev = require('./dev')

if (process.env.NODE_ENV === 'development') {
  webpackDev.plugins.push(new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'localhost:8080'
  }))
}

const app = express()

app.use(webpackMiddleware(webpack(webpackDev), {
  quiet: true,
  watch: true
}))

module.exports = app

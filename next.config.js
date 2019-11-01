const {
  WebpackBundleSizeAnalyzerPlugin,
} = require('webpack-bundle-size-analyzer')
const webpack = require('webpack')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
// const RemoveServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin');
const { ANALYZE, API_ENV } = process.env

module.exports = withSass(withCSS(
  withImages({
    webpack(config) {
      if (ANALYZE) {
        config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
      }

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.API_ENV': JSON.stringify(API_ENV),
        })
      )

      // rm sw.js
      // config.plugins.push(new RemoveServiceWorkerPlugin());

      return config
    },
  })
))

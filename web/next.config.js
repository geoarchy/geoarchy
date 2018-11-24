// next.config.js
require('dotenv').config()

const webpack = require('webpack')
const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  webpack(config, options) {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config;
  }
});

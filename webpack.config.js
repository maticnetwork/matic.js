/* global __dirname, require, module */
const path = require("path")
const env = require("yargs").argv.env // use --env with webpack 2
const CleanWebpackPlugin = require('clean-webpack-plugin')

const libraryName = "matic"

let mode = "development"

if (env === "build") {
  mode = "production"
}

const clientConfig = {
  mode,
  entry: `${__dirname}/src/index.js`,
  target: 'web',
  devtool: "source-map",
  output: {
    path: `${__dirname}/lib`,
    filename: `${libraryName}.umd.js`,
    library: libraryName,
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['lib']),
  ],
  externals : {
    web3: 'web3',
    'ethereumjs-util': 'ethereumjs-util',
    'query-string': 'query-string',
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  },
}

const serverConfig = {
  ...clientConfig,
  target: 'node',
  output: {
    path: `${__dirname}/lib`,
    filename: `${libraryName}.esm.js`,
    libraryTarget: "commonjs2",
  },
}

module.exports = [ clientConfig, serverConfig ]

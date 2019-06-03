/* global __dirname, require, module */
const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2

const libraryName = 'matic'

let mode = 'development'

if (env === 'build') {
  mode = 'production'
}

const clientConfig = {
  mode,
  entry: `${__dirname}/src/index.js`,
  target: 'web',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libraryName}.umd.js`,
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    web3: 'web3',
    'ethereumjs-util': 'ethereumjs-util',
    'query-string': 'query-string',
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
}

const serverConfig = {
  ...clientConfig,
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libraryName}.node.js`,
    // globalObject: 'this',
    libraryTarget: 'commonjs2',
  },
}

const standaloneConfig = {
  ...clientConfig,
  output: {
    ...clientConfig.output,
    library: 'Matic',
    filename: `${libraryName}.js`,
  },
  externals: {},
}

module.exports = [clientConfig, serverConfig, standaloneConfig]

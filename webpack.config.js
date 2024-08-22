/* global __dirname, require, module */
const path = require('path')
const webpack = require('webpack')
const env = require('yargs').argv.env // use --env with webpack 2
const banner = require('./license.js');
const copyPlugin = require('copy-webpack-plugin')

const libraryName = 'Matic'

let mode = 'development'

if (env === 'build') {
  mode = 'production'
}

const clientConfig = {
  mode,
  devtool: 'source-map',
  entry: `${__dirname}/src/index.ts`,
  target: 'web',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libraryName}.umd${mode === 'production' ? '.min' : ''}.js`,
    library: libraryName,
    libraryTarget: 'umd',
    // libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    web3: 'web3',
    '@ethereumjs/util': '@ethereumjs/util',
    'query-string': 'query-string',
    'bn.js': 'bn.js',
    '@ethereumjs/block': '@ethereumjs/block',
    '@ethereumjs/common': '@ethereumjs/common',
    '@ethereumjs/trie': '@ethereumjs/trie',
    'node-fetch': 'node-fetch',
    'rlp': 'rlp',
    'ethereum-cryptography': 'ethereum-cryptography',
    'buffer': 'buffer',
    'assert': 'assert',
    "stream": "stream"
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.json', '.js', '.ts', '.tsx']
  },
  plugins: [
    new copyPlugin({
      patterns: [{ from: path.resolve('build_helper', 'npm.export.js'), to: '' }],
    }),
    new webpack.BannerPlugin(banner)
  ],
}

const serverConfig = {
  ...clientConfig,
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libraryName}.node${mode === 'production' ? '.min' : ''}.js`,
    // globalObject: 'this',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BUILD_ENV': JSON.stringify("node")
    }),
  ],
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

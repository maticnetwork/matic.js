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
  entry: `${__dirname}/src/index.ts`,
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
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    'web3-eth': 'web3-eth',
    'web3-eth-abi': 'web3-eth-abi',
    'web3-utils': 'web3-utils',
    'ethereumjs-util': 'ethereumjs-util',
    'query-string': 'query-string',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.json', '.js', '.ts', 'tsx'],
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

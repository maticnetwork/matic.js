/* global __dirname, require, module */
const path = require('path')
const copyPlugin = require('copy-webpack-plugin')

const libraryName = 'matic'

let mode = process.env.NODE_ENV
const isProd = mode === 'production'

console.log('build runing for mode', mode)

const clientConfig = {
  mode,
  entry: `${__dirname}/src/index.ts`,
  target: 'web',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libraryName}.umd${isProd ? '.min' : ''}.js`,
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
    web3: 'web3',
    'ethereumjs-util': 'ethereumjs-util',
    'query-string': 'query-string',
    'bn.js': 'bn.js',
    axios: 'axios',
    '@maticnetwork/meta/network': '@maticnetwork/meta/network',
    'ethereumjs-tx': 'ethereumjs-tx',
    'ethereumjs-util': 'ethereumjs-util',
    'merkle-patricia-tree': 'merkle-patricia-tree',
    'ethereumjs-block': 'ethereumjs-block',
    'eth-sig-util': 'eth-sig-util',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.json', '.js', '.ts', 'tsx'],
  },
  plugins: [
    new copyPlugin({
      patterns: [{ from: path.resolve('build_helper', 'npm.export.js'), to: '' }],
    }),
  ],
}

const serverConfig = {
  ...clientConfig,
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libraryName}.node${isProd ? '.min' : ''}.js`,
    // globalObject: 'this',
    libraryTarget: 'commonjs2',
  },
}

const standaloneConfig = {
  ...clientConfig,
  output: {
    ...clientConfig.output,
    library: 'Matic',
    filename: `${libraryName}${isProd ? '.min' : ''}.js`,
  },
  externals: {},
}

module.exports = [clientConfig, serverConfig, standaloneConfig]

/* global __dirname, require, module */
const path = require('path')
const copyPlugin = require('copy-webpack-plugin')

const libraryName = 'matic'

let mode = process.env.NODE_ENV
const isProd = mode === 'production'

console.log('build runing for mode', mode)

const baseConfig = {
  mode,
  devtool: 'source-map',
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
    'bn.js': 'bn.js',
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
    alias: {
      // "@": path.resolve(__dirname, "./src")
    },
  },
  plugins: [
    new copyPlugin({
      patterns: [{ from: path.resolve('build_helper', 'npm.export.js'), to: '' }],
    }),
  ],
};

const libraryTarget = [{
  type: "umd",
  name: `${libraryName}.umd${isProd ? '.min' : ''}.js`
}, {
  type: "commonjs2",
  name: `${libraryName}.node${isProd ? '.min' : ''}.js`
}];

const serverConfig = {
  ...baseConfig,
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libraryName}.node${isProd ? '.min' : ''}.js`,
    // globalObject: 'this',
    libraryTarget: 'commonjs2',
  },
}

const standaloneConfig = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    library: 'Matic',
    filename: `${libraryName}${isProd ? '.min' : ''}.js`,
  },
  externals: {},
}

module.exports = [baseConfig, serverConfig, standaloneConfig]

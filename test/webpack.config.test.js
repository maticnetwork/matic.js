const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bin/'),
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': "'test'"
      'process.env': JSON.stringify(process.env),
    }),
  ],
  devtool: 'inline-source-map',
}

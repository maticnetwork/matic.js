const path = require('path')
const copyPlugin = require('copy-webpack-plugin')
const SmartBannerPlugin = require('smart-banner-webpack-plugin');
const banner = require('./licence');

const libraryName = 'Matic'
exports.libraryName = libraryName;
let mode = process.env.NODE_ENV
const isProd = mode === 'production'
exports.isProd = isProd;

console.log('build runing for mode', mode);
exports.default = {
    mode,
    devtool: 'source-map',
    entry: `./src/index.ts`,
    target: 'web',
    output: {
        path: path.join(__dirname, "./../dist"),
        filename: `${libraryName.toLowerCase()}.umd${isProd ? '.min' : ''}.js`,
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
        new SmartBannerPlugin(banner)
    ],
}
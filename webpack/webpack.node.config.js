const webpackMerge = require("webpack-merge");
const { default: webpackBaseConfig, libraryName, isProd } = require("./webpack.base.config");
var webpack = require('webpack');

exports.default = webpackMerge(webpackBaseConfig, {
    target: 'node',
    externals: {
        'ethereumjs-util': 'ethereumjs-util',
        'bn.js': 'bn.js',
        'eth-sig-util': 'eth-sig-util',
        '@ethereumjs/block': '@ethereumjs/block',
        '@ethereumjs/common': '@ethereumjs/common',
        'ethereumjs-tx': 'ethereumjs-tx',
        'ethereumjs-util': 'ethereumjs-util',
        'merkle-patricia-tree': 'merkle-patricia-tree',
        'node-fetch': 'node-fetch',
    },
    output: {
        filename: `${libraryName.toLowerCase()}.node${isProd ? '.min' : ''}.js`,
        // globalObject: 'this',
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BUILD_ENV': JSON.stringify("node")
        }),
    ],
})
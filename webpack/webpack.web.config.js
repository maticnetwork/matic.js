const webpackMerge = require("webpack-merge");
const { default: webpackBaseConfig, libraryName, isProd } = require("./webpack.base.config");
var webpack = require('webpack');

exports.default = webpackMerge(webpackBaseConfig, {
    target: 'web',
    output: {
        filename: `${libraryName.toLowerCase()}${isProd ? '.min' : ''}.js`,
        // globalObject: 'this',
        libraryTarget: 'var',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BUILD_ENV': JSON.stringify("web")
        }),
    ],
})
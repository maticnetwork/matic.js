const webpackMerge = require("webpack-merge");
const { default: webpackBaseConfig, libraryName, isProd } = require("./webpack.base.config");
var webpack = require('webpack');

exports.default = webpackMerge(webpackBaseConfig, {
    target: 'node',
    output: {
        filename: `${libraryName}.node${isProd ? '.min' : ''}.js`,
        // globalObject: 'this',
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BUILD_ENV': JSON.stringify("node")
        }),
    ],
})
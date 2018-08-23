/* global __dirname, require, module */
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const packageJSON = require("./package.json");

const libraryName = packageJSON.name;

let mode = "development";
let outputFile;

if (env === "build") {
  mode = "production";
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  mode,
  entry: `${__dirname}/src/index.js`,
  devtool: "source-map",
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  }
};

module.exports = config;

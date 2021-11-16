const webpackConfig = require('./webpack.config.test')
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    // plugins: ['karma-chai'],
    files: [
      // "src/**/*.ts",
      'specs/index.ts', // *.tsx for React Jsx
    ],
    preprocessors: {
      '**/*.ts': 'webpack',
      '**/*.js': 'webpack',
    },
    webpack: webpackConfig,
    client: {
      mocha: {
        timeout: 60000,
      },
    },
    reporters: ['mocha'],
    // browsers: ["jsdom"],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-translate',
          '--disable-extensions',
        ],
      },
    },
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    browserNoActivityTimeout: 60000,
  })
}

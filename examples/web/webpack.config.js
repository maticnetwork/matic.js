const path = require('path')

module.exports = env => {
  const config = {
    mode: 'production',
    entry: './main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
  }

  if (env && env.NODE_ENV !== 'production') {
    config.mode = 'development'
  }

  return config
}

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./matic.node.min.js')
} else {
  module.exports = require('./matic.node.js')
}

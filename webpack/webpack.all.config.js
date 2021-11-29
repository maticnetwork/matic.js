const umdConfig = require("./webpack.base.config").default;
const nodeConfig = require("./webpack.node.config").default;
const webConfig = require("./webpack.web.config").default;

exports.default = [nodeConfig, webConfig, umdConfig]
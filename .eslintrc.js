module.exports = {
  parser: "babel-eslint",
  extends: "eslint:recommended",
  globals: {
    Promise: true,
    Buffer: true
  },
  rules: {
    "space-before-function-paren": ["error", "never"],
    semi: ["error", "never"],
    "no-underscore-dangle": 0
  }
}

const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const filesize = require('rollup-plugin-filesize')
// const eslint = require('rollup-plugin-eslint')
// const uglify = require('rollup-plugin-uglify')

const pkgConfig = require('../package.json')

const baseConfig = {
  input: 'src/index.js',
  plugins: [
    json({
      preferConst: true,
      // compact: true,
    }),
    // eslint(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    commonjs(),
    filesize(),
    // uglify(),
  ],
}

export default [
  {
    ...baseConfig,
    output: {
      name: pkgConfig.name,
      file: pkgConfig.main,
      format: 'umd',
    },
  },
  {
    ...baseConfig,
    output: {
      name: pkgConfig.name,
      file: pkgConfig.module,
      format: 'es',
    },
  },
]

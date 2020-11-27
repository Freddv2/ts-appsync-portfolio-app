// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  optimization: {
    minimize: true,
    sideEffects: false,
  },
  context: path.resolve(__dirname, 'dist'),
  entry: './index.js',
  output: {
    libraryTarget: 'commonjs',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle'),
  },
}

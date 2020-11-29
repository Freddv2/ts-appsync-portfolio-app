// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    sideEffects: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  context: path.resolve(__dirname, 'dist'),
  entry: './index.js',
  output: {
    libraryTarget: 'commonjs',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle'),
  },
}

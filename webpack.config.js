const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { optimize, ProvidePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { join } = require('path');
let prodPlugins = [];
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(
    new optimize.AggressiveMergingPlugin(),
    new optimize.OccurrenceOrderPlugin()
  );
}
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: {
    contentscript: join(__dirname, 'src/contentscript/contentscript.ts'),
    background: join(__dirname, 'src/background/background.ts'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    noParse: /browserfs\.js/,
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.txt$/i,
        use: 'buffer-loader',
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    ...prodPlugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' }),
    new CopyPlugin({
      patterns: [{ from: 'src/dictionaries', to: 'dictionaries' }],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'fs': 'browserfs/dist/shims/fs.js',
      'buffer': 'browserfs/dist/shims/buffer.js',
      'path': 'browserfs/dist/shims/path.js',
      'processGlobal': 'browserfs/dist/shims/process.js',
      'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
      'bfsGlobal': require.resolve('browserfs')
    }
  },
  node: {
    process: false,
    Buffer: false,
    __dirname: true,
  },
};

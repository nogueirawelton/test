const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  target: 'web',
  entry: './src/js/index.js',
  output: {
    filename: './js/app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devServer: {
    port: 3000,
    // liveReload: true,
    watchFiles: ['**/*.php', 'dist/**/*'],
    devMiddleware: {
      writeToDisk: true,
    },
    hot: false,
    open: true,
    proxy: {
      '/': {
        target: 'http://localhost/landing-template-internit',
        pathRewrite: { '^/landing-template-internit': '' },
      },
      changeOrigin: true,
      secure: false,
    },
  },
};

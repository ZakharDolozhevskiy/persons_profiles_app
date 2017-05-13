const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  name    : 'app',
  target  : 'web',
  devtool : 'inline-source-map',
  entry   : {
    app : [
      'webpack-dev-server/client?http://localhost:9000',
      './app/app'
    ]
  },
  output : {
    path       : 'build',
    publicPath : '/'
  },
  devServer : {
    publicPath: '/',
    contentBase : './build',
    compress: true,
    port: 9000,
    historyApiFallback : true
  },
  plugins : [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      hash     : true,
      inject   : 'body',
      favicon  : 'app/assets/images/favicon.png',
      filename : 'index.html',
      template : 'app/index.html'
    }),
  ],
  resolve : {
    modules: ['node_modules'],
    extensions : ['.js', '.scss']
  },
  module : {
    rules : [
      {
        test : /\.(pug)$/,
        exclude: /node_modules/,
        loader  : 'pug-loader'
      },
      {
        test : /\.(js)$/,
        exclude: /node_modules/,
        loader  : 'babel-loader'
      },
      {
        test    : /\.(css)$/,
        loader  : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { url: true, sourceMap: true }
            },
            {
              loader: 'resolve-url-loader'
            }
          ],
          publicPath: '/'
        })
      },
      {
        test : /\.html$/, loader : 'html-loader'
      },
      /* eslint-disable */
      { test: /\.otf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-otf" },
      { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=fonts/[name].[ext]" },
      { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml" },
      /* eslint-enable */
      {
        test: /\.(jpg|png|gif)$/i,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  }
};

module.exports = webpackConfig;

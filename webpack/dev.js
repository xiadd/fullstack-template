const path = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const glob = require('glob')

// 当前环境
const env = process.env.NODE_ENV

// 获取所有入口文件
const getEntry = function (entryDir) {
  const entry = {}
  const srcFilename = entryDir + '/**/*.js'
  glob.sync(srcFilename).forEach(function (filepath) {
    const name = filepath.slice(filepath.lastIndexOf(path.resolve(__dirname, '../src/static/scripts')) + path.resolve(__dirname, '../src/static/scripts').length + 1, -3);
    entry[name] = filepath
  })
  return entry
}

module.exports = {
  entry: getEntry(path.resolve(__dirname, '../src/static/scripts')),
  output: {
    path: path.resolve(__dirname, '../src/static/dist'),
    filename: 'scripts/[name].[chunkhash:6].js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&minimize!postcss-loader?sourceMap'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&minimize!sass-loader?sourceMap'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    modules: [ 'node_modules' ],
    extensions: ['.js', '.json', '.css'],
    alias: {
      'styles': path.resolve(__dirname, '../src/static/styles'),
      'scripts': path.resolve(__dirname, '../src/static/scripts')
    }
  },
  plugins: [
    new CleanPlugin(['*'], {
      root: path.resolve(__dirname, '../src/static/dist')
    }),
    new ExtractTextPlugin({
      filename: "styles/[name]-[chunkhash:6].css",
      allChunks: true
    }),
    new ManifestPlugin({
      publicPath: '/static/',
      writeToFileEmit: true,
      stripSrc: '/static/'
    }),
    new FriendlyErrorsWebpackPlugin(),
  ]
}

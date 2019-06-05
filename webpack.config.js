const path = require('path');
const webpack = require('webpack');
const chokidar = require('chokidar');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const devMode = process.env.NODE_ENV !== 'production';

/**
 * CLI can use below variables of `env` object params:
 * name       - project name
 * entry      - js entry
 * template   - html template
 * output     - path output
 * publicPath - prefix path for static file, used to on the production mode
 */

module.exports = ({
  name = 'src',
  entry = './js/index.js',
  template = './index.html',
  image = './images',
  output = './dist',
  publicPath = '/',
} = {}) => {
  const getFilename = (pathString) => pathString.replace(/\.[^/.]+$/, '').split('/').slice(-1).join()
  const projectPath = path.resolve(__dirname, name);
  const outputPath = path.resolve(__dirname, output);
  const htmlPath = path.resolve(__dirname, name, template);
  const imagePath = path.resolve(__dirname, name, image);
  return {
    context: projectPath,
    entry: {
      [getFilename(entry)]: entry
    },
    output: {
      path: outputPath,
      filename: devMode ? '[name].js' : '[name].[contenthash:8].js',
      publicPath: devMode ? '/' : publicPath,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devServer: {
      before(app, server) {
        chokidar.watch(htmlPath).on('all', function() {
          server.sockWrite(server.sockets, 'content-changed');
        })
      },
      port: 8000,
      hot: true,
      open: true,
      disableHostCheck: true
    },
    plugins: [
      devMode ? new webpack.HotModuleReplacementPlugin() : new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: devMode ? [] : [outputPath]
      }),
      new HtmlWebPackPlugin({
        filename: `${getFilename(template)}.html`,
        template: htmlPath,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[contenthash:8].css'
      }),
      new CopyWebpackPlugin([{
        from: imagePath,
        to: 'images',
      }]),
      new ImageminPlugin({ 
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: devMode,
        pngquant: {
          quality: '95-100'
        } 
      })
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/react', '@babel/typescript'],
              },
            },
            {
              loader: 'eslint-loader',
              options: {
                // eslint options (if necessary)
                // fix: true,
                // emitWarning: true,
                // emitError: true,
                quiet: true,
                configFile: './.eslintrc',
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.json', '.scss'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@image': path.resolve(__dirname, 'src/images'),
        '@scss': path.resolve(__dirname, 'src/css'),
        '@js': path.resolve(__dirname, 'src/js'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };  
};

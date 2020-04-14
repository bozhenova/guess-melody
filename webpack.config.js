const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
};

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {};
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config;
}

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './main.ts']
  },
  output: {
    filename: '[name].[hash].js',
    path: PATHS.dist,
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.scss', '.css']
  },
  devtool: isDev ? 'source-map' : '',
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      },
      chunks: ['main']
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: path.join(process.cwd(), 'dist/*.*')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      },
      { from: `${PATHS.src}/img`, to: `${PATHS.dist}/img` },
      { from: `${PATHS.src}/img/sprite`, to: `${PATHS.dist}/img/sprite` },
      { from: `${PATHS.src}/fonts`, to: `${PATHS.dist}/fonts` }
    ]),
    new MiniCssExtractPlugin({
      filename: './style.[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loder',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.dist}/fonts`,
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.dist}/img`
            }
          },
        ]
      }
    ]
  }
}


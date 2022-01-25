const webpack = require("webpack");
const path = require("path");
const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-polyfill");


const publicPath = "";

const includePath = [
  paths.appSrc
];

const excludePath = [
  path.join(paths.appSrc, "/**/__tests__/")
];

module.exports = {

  entry: [
    "babel-polyfill", paths.appIndexTs
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json"
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: includePath,
        exclude: excludePath,
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(paths.appPublic),
          to: path.join(paths.appDist, "/static/"),
          ignore: ["index.html"]
        }
      ]
    ),
    new webpack.HotModuleReplacementPlugin()
  ]

};

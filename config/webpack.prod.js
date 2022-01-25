const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const prod = {
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.ADAMOS_HOST": JSON.stringify("https://kmon.adamos.com"),
      "process.env.ADAMOS_HOST_CHINA": JSON.stringify("https://kmon.adamos.com/"),
      "process.env.ADAMOS_HOST_DEV": JSON.stringify("https://kmon-dev.adamos-dev.com"),
      "process.env.IS_PRODUCTION": JSON.stringify(true),
      "process.env.DEVICE_POLLING_INTERVAL": JSON.stringify(60)
    })
  ]
};

module.exports = merge(common, prod);

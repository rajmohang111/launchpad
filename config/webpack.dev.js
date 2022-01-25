const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");


const dev = {
  entry: [
    "webpack/hot/dev-server",
    "webpack-dev-server/client?/"
  ],
  devtool: 'cheap-module-source-map',
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.ADAMOS_HOST": JSON.stringify("https://kmon.adamos.com"),
      "process.env.ADAMOS_HOST_CHINA": JSON.stringify("https://kmon.adamos.com/"),
      "process.env.ADAMOS_HOST_DEV": JSON.stringify("https://kmon-dev.adamos-dev.com"),
      "process.env.IS_PRODUCTION": JSON.stringify(false),
      "process.env.DEVICE_POLLING_INTERVAL": JSON.stringify(process.env.DEVICE_POLLING_INTERVAL || 30)
    })
  ]
};

module.exports = merge(common, dev);

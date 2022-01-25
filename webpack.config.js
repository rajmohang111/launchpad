const webpackDev = require("./config/webpack.dev");
const webpackQa = require("./config/webpack.qa");
const webpackProd = require("./config/webpack.prod");

module.exports = function(env, args) {
  switch(process.env.NODE_ENV) {
    case "development":
      return webpackDev;
    case "qa":
      return webpackQa;
    default:
      return webpackProd;
  }
};

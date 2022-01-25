const paths = require("./paths");

module.exports = function() {
  return {

    compress: true,
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: "/"


  }
};

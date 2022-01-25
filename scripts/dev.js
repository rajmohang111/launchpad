const webpack = require("webpack");
const WebPackDevServer = require("webpack-dev-server");
const createDevServerConfig = require("../config/webpackDevServer.config");
const config = require("../webpack.config");

const port = process.env.PORT || "8080";

const devServerConfig = createDevServerConfig();

const compiler = webpack(config());
const devServer = new WebPackDevServer(compiler, devServerConfig);
devServer.listen(port, err => {

  if (err) {
    return console.log(err);
  }

  ['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
      devServer.close();
      process.exit();
    });
  });
});

const fs = require('fs');
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const getPublicUrl = () => process.env.PUBLIC_URL || "/";

module.exports = {

  appIndexTs: resolveApp("src/index.ts"),
  appSrc: resolveApp('src/'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp("public"),
  publicUrl: getPublicUrl(),
  appBuild: resolveApp("build"),
  appCordova: resolveApp("cordova"),
  appDist: resolveApp("dist")
};

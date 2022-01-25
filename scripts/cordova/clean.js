const promisfy = require("promisify-node");
const rimraf = promisfy(require("rimraf"));
const paths = require("../../config/paths");
const path = require("path");

rimraf(path.join(paths.appCordova, "www"));
rimraf(path.join(paths.appCordova, "platforms"));
rimraf(path.join(paths.appCordova, "node_modules"));
rimraf(path.join(paths.appCordova, "plugins"));

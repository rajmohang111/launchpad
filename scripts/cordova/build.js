const promisfy = require("promisify-node");
const rimraf = promisfy(require("rimraf"));
const paths = require("../../config/paths");
const path = require("path");

rimraf(path.join(paths.appDist));
rimraf(path.join(paths.appCordova, "www"));

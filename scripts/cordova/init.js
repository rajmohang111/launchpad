const promisfy = require("promisify-node");
const rimraf = promisfy(require("rimraf"));
const paths = require("../../config/paths");
const path = require("path");
const mkdirp = promisfy(require("mkdirp"));


rimraf(path.join(paths.appCordova, "platforms"));
mkdirp(path.join(paths.appCordova, "www"));


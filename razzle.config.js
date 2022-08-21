const path = require('path');
const webpack = require('webpack');

module.exports = {
  modifyPaths({
    webpack, // the imported webpack node module
    paths, // the default paths that will be used by Razzle.
  }) {
    // Change paths
    paths.appServerIndexJs = path.join(__dirname, '/src/server')
    paths.appServerJs = path.join(__dirname, '/src/server/server.tsx')

    return paths;
  }
};
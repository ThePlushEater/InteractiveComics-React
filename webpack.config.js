var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "./dist/interactivecomic.js",
    path: __dirname,
  },
  plugins: [
    new webpack.ProvidePlugin({
      'createjs': 'imports?this=>global!exports?createjs!createjs',
    })
  ],
  resolve: {
    // Absolute path that contains modules
    root: __dirname,
    // Directory names to be searched for modules
    modulesDirectories: ['lib', 'node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'createjs' : path.join(__dirname, './lib/createjs.js'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        publicPath: '../',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=dist/[name].[ext]" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=dist/[name].[ext]" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=dist/[name].[ext]" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=dist/[name].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=dist/[name].[ext]" }
    ],
  },
}

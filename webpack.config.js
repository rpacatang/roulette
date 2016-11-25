var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== 'production';

module.exports = {
  context : __dirname,
  entry : './src/main.js',
  devtool : debug ? 'inline-sourcemap' : null,
  output : {
    path : __dirname + '/app/js',
    publicPath : '/js/',
    filename : 'roulette.js'
  },
  module : {
    loaders : [
      {
        test : /.css$/,
        loader : 'style!css'
      }, {
        test : /.js$/,
        loader : 'babel',
        query : {
          presets : [ 'es2015', 'react' ]
        }
      }
    ]
  },
  plugins : debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle : false, sourcemap : false })
  ]
};
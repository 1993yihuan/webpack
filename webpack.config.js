/**
 * heyihuan
 */
var path = require('path');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcsscenter = require('postcss-center');
module.exports = {
    devtool: 'source-map',
    entry: {
        '/js/main':'./js/main.js',
        '/js/index':'./js/index.js',
        '/js/public':['./lib/jquery.min.js'],

    },
    output: {
        path: "./dist/", // 输出文件的保存路径
        filename: '[name].build.js', // 输出文件的名称
        sourceMapFilename:'/map/[file].map'
    },
    module: {
        loaders: [
            {
                test:  /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer, postcsscenter];
    }
  }

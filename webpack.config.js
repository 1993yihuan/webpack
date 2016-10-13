/**
 * heyihuan
 */
var path = require('path');
module.exports = {
    entry: {
        '/dist/js/main':'./js/main.js',
        '/dist/js/index':'./js/index.js',
        '/dist/js/public':['./lib/jquery.min.js'],
    },
    output: {
        path: "./", // 输出文件的保存路径
        filename: '[name].build.js' // 输出文件的名称
    },
    module: {
        loaders: [
            { test: /\.css$/, loaders: 'style!css!autoprefixer?{browsers:["last 2 version", "> 1%"]}' }
        ]
    },
    watch: true
  }

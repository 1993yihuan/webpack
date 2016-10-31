/**
 * heyihuan
 */
var webpack = require('webpack');
var path = require('path');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcsscenter = require('postcss-center');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: 'source-map',
    entry: {
        main:'./js/main.js',
        index:'./js/index.js',
        public:['./lib/jquery.min.js'],

    },
    output: {
        path: "./dist/", // 输出文件的保存路径
        filename: 'js/[name].build.js', // 输出文件的名称
        sourceMapFilename:'map/[file].map'
    },
    module: {
        loaders: [
            {
                test:  /\.css$/,
                // loader: 'style-loader!css-loader!postcss-loader',
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap", "postcss-loader")
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('build in '+new Date().toLocaleString()+' by heyihuan'),
        new ExtractTextPlugin('./css/[name].build.css'),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
    ],
    postcss: function () {
        return [precss, autoprefixer, postcsscenter];
    }
  }

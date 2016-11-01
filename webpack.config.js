/**
 * heyihuan
 */
var webpack = require('webpack');
var path = require('path');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcsscenter = require('postcss-center');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap", "postcss-loader")
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('build in '+new Date().toLocaleString()+' by heyihuan'),//增加头部信息
        new ExtractTextPlugin('./css/[name].build.css'),//独立css文件
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),//全局jqury文件
        new CleanWebpackPlugin('dist')//清空输出文件夹
    ],
    postcss: function () {
        return [precss, autoprefixer, postcsscenter];
    }
  }

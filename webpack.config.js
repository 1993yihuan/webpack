/**
 * heyihuan
 * //Windows
 * set NODE_ENV=test
 * //Linux or OSX
 * export NODE_ENV=test
 */
var webpack = require('webpack');
var path = require('path');
var util=require('util');

var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcsscenter = require('postcss-center');
var postcssmixins = require('postcss-mixins');
var postcssnested = require('postcss-nested');
var postcssvars = require('postcss-simple-vars');
var postcssfor = require('postcss-for');
var postcsscalc = require('postcss-calc');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 遍历views文件
var fs = require('fs');

//定义环境变量地址
var API = {
	test: 'http://test.api.xx.com',
	pro: 'http://api.xx.com',
	dev: 'http://dev.api.xx.com'
};
//定义入口文件
var entryArr = {
    public:['./lib/jquery.js']
};
fs.readdirSync('js/entry').forEach((page) => {
	entryArr[page.replace('.js','')] = './js/entry/'+page
})
//定义插件
var pluginsArr = [
    new webpack.BannerPlugin('build in '+new Date().toLocaleString()+' by heyihuan'),//增加头部信息
    new ExtractTextPlugin('./css/[name].build.css'),//独立css文件
    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
    }),//全局jqury文件
    new webpack.DefinePlugin({
        baseUrl:JSON.stringify(API[process.env.NODE_ENV])
    }),//配置全局变量
    new CleanWebpackPlugin('dist')//清空输出文件夹
];

fs.readdirSync('views').forEach((page) => {
    var htmlPlugin = new HtmlWebpackPlugin({
        title: 'Custom template',
        filename: 'views/'+page,
        template: 'views/'+page,
        inject: 'head',
        hash: true,
        chunks: [page.replace('.html','')]
    });
    pluginsArr.push(htmlPlugin);
});

module.exports = {
    devtool: 'source-map',
    entry: entryArr,
    output: {
        path: "./dist/", // 输出文件的保存路径
        filename: 'js/[name].build.js', // 输出文件的名称
        sourceMapFilename:'map/[file].map'
    },
    module: {
        loaders: [
            {
                test:  /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader?sourceMap")
            }
        ]
    },
    plugins: pluginsArr,
    postcss: function () {
        return [precss, autoprefixer, postcsscenter, postcssnested, postcssfor, postcsscalc, postcssvars ];
    }
 }

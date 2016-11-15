/**
 * heyihuan
 *
 * Windows
 * set NODE_ENV=test
 * Linux or OSX
 * export NODE_ENV=test
 *
 */
'use strict';


/*====================package文件====================*/
const webpack = require('webpack');
const path = require('path');
const util=require('util');
const fs = require('fs');

const precss       = require('precss');
const autoprefixer = require('autoprefixer');
const postcsscenter = require('postcss-center');
const postcssmixins = require('postcss-mixins');
const postcssnested = require('postcss-nested');
const postcssvars = require('postcss-simple-vars');
const postcssfor = require('postcss-for');
const postcsscalc = require('postcss-calc');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*====================package文件====================*/
const headerHtml =fs.readFileSync("views/header.html","utf-8");
const footerHtml =fs.readFileSync("views/footer.html","utf-8");


/*====================初始化对象====================*/
let webpackObj = {};
/*!====================初始化对象====================*/



/*====================环境变量地址====================*/
let API = {
	test: 'http://test.api.xx.com',
	pro: 'http://api.xx.com',
	dev: 'http://dev.api.xx.com'
};
/*!====================环境变量地址====================*/



/*====================入口文件====================*/
let entryArr = {
    public:['./lib/jquery.js']
};
fs.readdirSync('js/entry').forEach((page) => {
	entryArr[page.replace('.js','')] = './js/entry/'+page
})
/*!====================入口文件====================*/



/*====================输出路径====================*/
let output = {
	path: "./dist/", // 输出文件的保存路径
	filename: 'js/[name].build.js', // 输出文件的名称
	sourceMapFilename:'map/[file].map',
	publicPath: "/"
}
/*!====================输出路径====================*/



/*====================模块====================*/
let moduleArr = {
	loaders: [
		{
			test:  /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader?sourceMap")
		},
		{
			test: /\.(png|jpg)$/,
　　　　　　	loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
		}
	]
}
/*!====================模块====================*/



/*====================插件====================*/
let pluginsArr = [
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
        filename: 'views/'+page,
        template: 'views/'+page,
        inject: 'head',
        hash: true,
        chunks: [page.replace('.html','')],
		headerHtml: headerHtml,
		footerHtml: footerHtml
    });
    pluginsArr.push(htmlPlugin);
});
/*!====================插件====================*/



/*====================插件配置====================*/
// webpackObj.postcss = function () {
// 	return [precss, autoprefixer, postcsscenter, postcssnested, postcssfor, postcsscalc, postcssvars ];
// }
/*!====================插件配置====================*/



/*====================合并变量====================*/
webpackObj = {
    devtool: 'source-map',
    entry: entryArr,
    output: output,
    module: moduleArr,
    plugins: pluginsArr,
	postcss: function () {
		return [precss, autoprefixer, postcsscenter, postcssnested, postcssfor, postcsscalc, postcssvars ];
	}
}
/*!====================合并变量====================*/



module.exports = webpackObj;

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
var HtmlWebpackPlugin = require('html-webpack-plugin');

//定义入口文件
var entryArr = {
    main:'./js/main.js',
    index:'./js/index.js',
    public:['./lib/jquery.js']
};
//定义插件
var pluginsArr = [
    new webpack.BannerPlugin('build in '+new Date().toLocaleString()+' by heyihuan'),//增加头部信息
    new ExtractTextPlugin('./css/[name].build.css'),//独立css文件
    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
    }),//全局jqury文件
    // new HtmlWebpackPlugin({
    //    title: 'Custom template',
    //    filename: './html-plugin.html',
    //    template: './html-plugin.html', // Load a custom template
    //    inject: 'head', // Inject all scripts into the body
    //    chunks: ['index']
    // }),
    new CleanWebpackPlugin('dist')//清空输出文件夹
];

var pageArr = [
    'html-plugin',
    'index',
    'main'
];
pageArr.forEach((page) => {
  var htmlPlugin = new HtmlWebpackPlugin({
        title: 'Custom template',
        filename: 'views/'+page+'.html',
        template: 'views/'+page+'.html',
        inject: 'head',
        hash: true,
        chunks: [page]
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap", "postcss-loader")
            }
        ]
    },
    plugins: pluginsArr,
    postcss: function () {
        return [precss, autoprefixer, postcsscenter];
    }
 }

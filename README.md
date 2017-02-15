##webpack
>在多人协作和文件预处理方面，能更加灵活去编译打包

###所扩展的功能
> - 1、采用postcss，对样式进行处理
> - 2、生成html模块，最html文件进行自由组合
> - 3、自由生成签名
> - 4、环境变量配置，根据开发测试环境信息，区别性打包
> - 5、文件清空

####1、公共文件
>将整个项目的公共文件，打包为一个文件

```javascript
let entryArr = {
    public:['./lib/jquery.js']
};
```

####2、入口文件配置
>每次编译，都将去检索js/entry下的入口文件，并根据这些文件进行打包

```javascript
const fs = require('fs');
fs.readdirSync('js/entry').forEach((page) => {
	entryArr[page.replace('.js','')] = './js/entry/'+page
})

```

####3、文件输出
>将根据对应的入口文件名，输出至dist文件夹下，生成对应的map文件并追加build标识

```javascript
let output = {
	path: "./dist/", // 输出文件的保存路径
	filename: 'js/[name].build.js', // 输出文件的名称
	sourceMapFilename:'map/[file].map',
	publicPath: "/"
}
```

####4、模块
>配置相应文件的编译流程

```javascript
let moduleArr = {
	loaders: [
		{
			test:  /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader?sourceMap")
		},
		{
			test: /\.(png|jpg)$/,
　　　　　　	loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
		},
		{
	        test: /\.(htm|html)$/i,
	        loader: 'html-withimg-loader'
	    }
	]
}
```

####5、编译信息的配置
>为每个文件增加编译信息

```javascript
new webpack.BannerPlugin('build in '+new Date().toLocaleString()+' by heyihuan')
```

####5、将编译好的css文件独立输出
>webpack默认将css打包在一起，当希望将css文件独立输出时

```javascript
new ExtractTextPlugin('./css/[name].build.css')
```

####6、对jquery的处理
>由于jquery用得多，需单独处理

```javascript
new webpack.ProvidePlugin({
    $:"jquery",
    jQuery:"jquery",
    "window.jQuery":"jquery"
})
```

####7、对全局变量的处理
>当分环境打包时，这就比js文件定义变量，灵活多了

>process.env.NODE_ENV来自sh命令

```javascript
let API = {
	test: 'http://test.api.xx.com',
	pro: 'http://api.xx.com',
	dev: 'http://dev.api.xx.com'
};
new webpack.DefinePlugin({
    baseUrl:JSON.stringify(API[process.env.NODE_ENV])
})
```

####8、清空文件夹
>编译开始前，需要清空输出文件夹

```javascript
new CleanWebpackPlugin('dist')
```

####9、生成html文件
>自动生成引用文件与公共html部分，并加上hash值

```javascript
const headerHtml =fs.readFileSync("views/header.html","utf-8");
const footerHtml =fs.readFileSync("views/footer.html","utf-8");

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
```

####10、合并变量，exports
>将以上的变量合并整理

```javascript
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
module.exports = webpackObj;

```

####11、webpack.sh
>写了一个sh文件，去分辨环境变量，对变量进行处理

```sh
Sys_starttime=$(date +%s)
type=$1
starttime=$(date '+%Y-%m-%d %H:%M:%S')

echo '\033[36m*****************************************\033[0m'
echo '\033[36m*      START HE YIHUAN BETA WEBPACK     *\033[0m'
echo '\033[36m*****************************************\033[0m'

export NODE_ENV=${type}
webpack

endttime=$(date '+%Y-%m-%d %H:%M:%S')
Sys_endttime=$(date +%s)

echo '\033[45;37m ======END HE YIHUAN BETA WEBPACK' $starttime' USE '$(($Sys_endttime-$Sys_starttime))'s======\033[0m'

```

####12、package.json
>定义命令行

```json
"scripts": {
    "build-dev": "sh webpack.sh dev",
    "build-test": "sh webpack.sh test",
    "build-pro": "sh webpack.sh pro"
  }
```

####13、最后一步

```sh
npm run build-dev
```
*Yihuan He email:yihuan1993@qq.com*

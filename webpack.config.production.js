const path = require("path")
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
	mode: "production",
	entry: {
		libRoot: "./src/main.ts",
	},
	// target: 'node', // 这是最关键的
	target: 'web', // <=== 默认为 'web'，可省略

	externals: {
		"vue": "Vue"
	},

	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "build", "lib"),
		library: {
			type: "umd"
		},
		libraryExport: 'default',
		umdNamedDefine: true,
		// 为了构建web应用，打包后如果想在nodejs环境使用的，那么打包后的资源里面又self变量，
		// 该变量是浏览器端独有，所有为了能够让包既能在web端使用，又能在nodejs端使用，因此添加慈航代码，兼容标识全局
		globalObject: 'typeof self !== \'undefined\' ? self : this',

		environment: {
			arrowFunction: false
		}
	},
	resolve: {
		// 兼容处理后缀名，比如导入导出的时候，不需要写后缀名，让webpack进行自我推断
		extensions: [".js", ".ts", ".vue"]
	},

	module: {
		rules: [

			{
				// 这个是专门用来转换.vue文件里面的script代码
				test: /\.js$/,
				use: "babel-loader",
			},
			{
				test: /\.vue$/,
				use: [{
					loader: 'vue-loader'
				}]
			},

			{
				test: /\.ts$/,
				use: [{
					loader: 'babel-loader',
					// options:
					// 	{
					// 		"presets": [
					// 			["@babel/preset-env", {
					// 				// 配置信
					// 				// 要兼容的目标浏览器
					// 				targets: {
					// 					"ie": "6"
					// 				},
					// 				// 指定corejs的版本
					// 				"corejs": "3",
					// 				// 使用corejs的方式 "usage" 表示按需加载
					// 				"useBuiltIns": "usage"
					// 			}]
					// 		],
					// 	},
				}, 'ts-loader'],
				exclude: file => (
					/node_modules/.test(file) &&
					!/\.vue\.js/.test(file)
				),
			},
		]
	},
	plugins: [
		// 请确保引入这个插件！
		new VueLoaderPlugin()
	]
}

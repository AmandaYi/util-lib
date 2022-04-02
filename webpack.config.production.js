const path = require("path")
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
	mode: "production",
	entry: {
		libRoot: "./src/main.js",
	},
	// target: 'node', // 这是最关键的
	target: 'web', // <=== 默认为 'web'，可省略
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "build", "lib"),
		library: {
			type: "umd"
		},
		// libraryExport: 'default',
		umdNamedDefine: true,
		// 为了构建web应用，打包后如果想在nodejs环境使用的，那么打包后的资源里面又self变量，
		// 该变量是浏览器端独有，所有为了能够让包既能在web端使用，又能在nodejs端使用，因此添加慈航代码，兼容标识全局
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	resolve: {
		// 兼容处理后缀名，比如导入导出的时候，不需要写后缀名，让webpack进行自我推断
		extensions: [".js", ".vue"]
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: file => (
					/node_modules/.test(file) &&
					!/\.vue\.js/.test(file)
				),
				options: {
					"presets": [
						["@babel/preset-env"]
					],
				},
			}
		]
	},
	plugins: [
		// 请确保引入这个插件！
		new VueLoaderPlugin()
	]
}

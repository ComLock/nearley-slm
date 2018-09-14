import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'; // Supports ECMAScript2015


module.exports = {
	context: path.resolve(__dirname, 'src'),
	devtool: false, // Don't waste time generating sourceMaps
	entry: {
		'indented': './indented.es',
	},
	mode: 'development',
	module: {
		rules: [{
			test: /\.es$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					babelrc: false,
					//comments: false,
					//compact: false,
					//minified: false,
					plugins: [
						'array-includes',
						'@babel/plugin-proposal-object-rest-spread',
						'@babel/plugin-transform-object-assign'//,
						//"@babel/plugin-transform-regenerator"
						//"@babel/plugin-transform-runtime"
					],
					presets: [
						["@babel/preset-env", {
							//modules: false,
							"useBuiltIns": false // false means polyfill not required runtime
						}]
					]
				}
			}]
		}]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true, // highly recommended Default number of concurrent runs: os.cpus().length - 1.
				sourceMap: false,
				uglifyOptions: {
					compress: false,
					keep_fnames: true,
					mangle: false,
					output: {
						beautify: false,
						comments: false
					}
				} // uglifyOptions
			}) // UglifyJsPlugin
		] // minimizer
	}, // optimization
	output: {
		path: path.join(__dirname, 'src'),
		filename: '[name].js',
		libraryTarget: 'commonjs'
	}
};

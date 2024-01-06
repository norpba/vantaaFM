const webpack = require('webpack')
const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, args) => {
	const config = {
		entry: {
			'scripts/main': path.resolve('./src/bootstrap.tsx'),
		},
		output: {
			path: path.resolve('./dist'),
		},
		target: 'web',
		devtool: 'source-map',
		optimization: {
			splitChunks: {
				// always create vendor.js
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'scripts/vendor',
						chunks: 'initial',
						enforce: true,
					},
				},
			},
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.html', '.txt'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					}],
				},
			],
		},

		watchOptions: {
			aggregateTimeout: 100,
			ignored: /node_modules/,
			poll: 300
		},

		devServer: {
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			compress: false,
			port: 3030,
			historyApiFallback: true,
			hot: true,
		},

		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					// static files to the site root folder (index and robots)
					{
						from: '**/*',
						to: path.resolve('./dist/'),
						context: './src/static/'
					},
				]
			}),
		],
	}
	return config
}

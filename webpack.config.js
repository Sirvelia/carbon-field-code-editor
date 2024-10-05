const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { ProvidePlugin } = require('webpack');

/**
 * Indicates if we're running the build process in production mode.
 *
 * @type {Boolean}
 */
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		bundle: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: isProduction ? '[name].min.js' : '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
							sassOptions: {
								fiber: false,
							},
						},
					},
				],
			},
		],
	},
	externals: {
		'@wordpress/compose': 'cf.vendor["@wordpress/compose"]',
		'@wordpress/data': 'cf.vendor["@wordpress/data"]',
		'@wordpress/element': 'cf.vendor["@wordpress/element"]',
		'@wordpress/hooks': 'cf.vendor["@wordpress/hooks"]',
		'@wordpress/i18n': 'cf.vendor["@wordpress/i18n"]',
		'classnames': 'cf.vendor["classnames"]',
		'lodash': 'cf.vendor["lodash"]',
		'@carbon-fields/core': 'cf.core',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: isProduction ? '[name].min.css' : '[name].css',
		}),
		new ProvidePlugin({
			wp: ['@wordpress/element', 'default'],
		}),
	],
	optimization: {
		minimize: isProduction,
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
			new CssMinimizerPlugin(),
		],
	},
	stats: {
		modules: false,
		hash: false,
		builtAt: false,
		children: false,
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

let config = {
	output: {
		path: path.resolve(__dirname + '/dist/')
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: __dirname,
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
					loader: 'image-webpack-loader',
					query: {
						mozjpeg: {
							progressive: true
						},
						gifsicle: {
							interlaced: false
						},
						optipng: {
							optimizationLevel: 4
						},
						pngquant: {
							quality: '75-90',
							speed: 3
						}
					}
				}]
			}
		]
	},
	resolve: {
		modules: [
			'node_modules',
			__dirname
		]
	}
};


module.exports = [
	merge(config, {
		entry: path.resolve(__dirname + '/index.js'),
		output: {
			filename: 'leaflet-map.js',
			libraryTarget: 'umd',
			library: 'leaflet-map',
			umdNamedDefine: true
		}
	})
];

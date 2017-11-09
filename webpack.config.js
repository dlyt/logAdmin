/**
 * webpack是一款模块加载器兼打包工具，
 * 它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。
 */
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
		app: [ "webpack-hot-middleware/client?reload=1", "./src/client/index.js" ]  //热加载
	},
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    // alias: {
    //     'components': resolve('src/client/components'),
    // }
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [ path.join(__dirname, 'src/client') ],
        options: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: [['import', { libraryName: 'antd', style: true}]]
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src/client/index.js'),
        ],
        query: {
          presets: [ 'es2015', 'react'],
        }
      },
      
      {
        test: /\.less$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'less-loader'}]
      }
  ]
  }
}

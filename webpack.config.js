const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './dist/app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
	{ from: './maqueta/html/maquetas/acceso.html', to: "acceso.html" },
	{ from: './maqueta/html/maquetas/index.html', to: "documents.html" },
	{ from: './maqueta/html/maquetas/botones.html', to: "botones.html" },	
	{ from: './maqueta/html/maquetas/login.html', to: "index.html" }
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}

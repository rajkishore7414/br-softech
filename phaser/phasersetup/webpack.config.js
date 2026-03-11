const path = require('path');

module.exports = {
  mode: 'development', // change to 'production' for production build

  entry: './src/index.js', // starting point of your app

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devtool: 'source-map',

  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true
  }
};

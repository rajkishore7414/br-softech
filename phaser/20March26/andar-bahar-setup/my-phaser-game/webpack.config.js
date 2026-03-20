const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/js/Main.js"),
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    hot: true,
    host: "localhost",
    port: 8082,
    allowedHosts: "all",
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
  target: "web",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
};

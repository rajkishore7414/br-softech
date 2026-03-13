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
    port: 8083,
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



// ## Full picture:
// ```
// Main.js (entry)
//     ↓
// Webpack reads all imports
//     ↓
// Applies rules (html-loader for .html)
//     ↓
// Runs plugins (copy assets, extract CSS, inject HTML)
//     ↓
// Outputs bundle.js to dist/
//     ↓
// Dev server serves it at localhost:8082
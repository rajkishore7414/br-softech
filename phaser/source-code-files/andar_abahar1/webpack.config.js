const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin"); // Add this


module.exports = {
  entry: path.resolve(__dirname, "./src/js/Main.js"), // Correct the entry point to your main JavaScript file
  devtool: "inline-source-map",
  // output: {
  //   path: path.resolve(__dirname, "./dist"),
  //   filename: "bundle.js",
  //   clean: true,
  // },

  output: {
    path: path.resolve(__dirname, "./Virtual_Andar_Bahar_1.0_HTML5/"),
    filename: "bundle.js",
    // publicPath: "https://ik.imagekit.io/iyafbeire/Virtual_Andar_Bahar_1.0_HTML5/",
    clean: true,
  },

  devServer: {
    hot: true,
    host: "0.0.0.0",
    port: 8585,
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
        // Remove the line below since you are already extracting styles with MiniCSSExtractPlugin
        { from: "src/style.css", to: "style.css" },
      ],
    }),
    new MiniCSSExtractPlugin(),
    // Remove the line below since webpack-dev-server takes care of Hot Module Replacement internally
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      // {
      //   test: /\.css$/,
      //   use: [ "css-loader"],
      // },
    ],
  },
  // 👇 Add this section
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // 🔥 Removes all console.* statements
          },
        },
      }),
    ],
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const root = path.dirname(__dirname);

module.exports = {
  mode: "development",
  entry: {
    dashboard: path.resolve(root, "./src/pages/dashboard/index.ts"),
    editor: path.resolve(root, "./src/pages/editor/index.ts"),
    client: path.resolve(root, "./src/pages/client/index.ts"),
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(root, "dist"),
    open: true,
    proxy: {
      "/api": "http://localhost:8082",
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(root, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, "./src/pages/dashboard/index.html"),
      filename: "./index.html",
      chunks: ["dashboard"],
    }),
    new HtmlWebpackPlugin({
      title: "create",
      template: path.resolve(root, "./src/pages/editor/index.ejs"),
      filename: "./create/index.html",
      chunks: ["editor"],
    }),
    new HtmlWebpackPlugin({
      title: "editor",
      template: path.resolve(root, "./src/pages/editor/index.ejs"),
      filename: "./editor/index.html",
      chunks: ["editor"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, "./src/pages/client/index.html"),
      filename: "./client/index.html",
      chunks: ["client"],
    }),
  ],
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

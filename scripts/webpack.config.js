const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const root = path.dirname(__dirname);

module.exports = {
  mode: "development",
  entry: {
    editor: path.resolve(root, "./src/editor/index.ts"),
    client: path.resolve(root, "./src/runtime/index.ts")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(root, "dist", "editor"),
    open: true,
    openPage: 'editor.html#/editor/create',
    proxy: {
      "/runtime": {
        target: "http://localhost:8081",
      }
    },
    writeToDisk: true
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(root, "dist", "editor"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, "./src/editor/index.html"),
      filename: './editor.html',
      chunks: ['editor']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, "./src/runtime/index.html"),
      filename: './runtime.html',
      chunks: ['client']
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

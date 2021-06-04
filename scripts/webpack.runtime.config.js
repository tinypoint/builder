const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const root = path.dirname(__dirname);

module.exports = {
  mode: "development",
  entry: path.resolve(root, "./src/runtime/index.ts"),
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(root, "dist", "runtime"),
    port: 8081,
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(root, "dist", "runtime"),
    publicPath: '/runtime',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, "./src/runtime/index.html"),
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

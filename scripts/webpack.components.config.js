const path = require("path");

const root = path.dirname(__dirname);

module.exports = {
  mode: "development",
  entry: {
    container: path.resolve(root, "./src/components/container/index.tsx"),
    page: path.resolve(root, "./src/components/page/index.tsx"),
    img: path.resolve(root, "./src/components/img/index.tsx"),
    button: path.resolve(root, "./src/components/button/index.tsx"),
    text: path.resolve(root, "./src/components/text/index.tsx"),
    scroller: path.resolve(root, "./src/components/scroller/index.tsx"),
    ppt: path.resolve(root, "./src/components/ppt/index.tsx"),
    "ppt-container": path.resolve(
      root,
      "./src/components/ppt-container/index.tsx"
    ),
  },
  devtool: "inline-source-map",
  output: {
    library: {
      name: "[name]",
      type: "amd",
    },
    filename: "[name].js",
    path: path.resolve(root, "publish"),
  },
  externals: [
    {
      // 字符串
      react: "react",
    },
    // 函数
    // function ({ context, request }, callback) {
    //   if (/^yourregex$/.test(request)) {
    //     return callback(null, "commonjs " + request);
    //   }
    //   callback();
    // },
  ],
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

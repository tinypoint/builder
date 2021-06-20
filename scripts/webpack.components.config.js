const path = require('path');

const root = path.dirname(__dirname);

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    library: {
      name: '[name]',
      type: 'umd',
      umdNamedDefine: true,
      export: 'default',
    },
    filename: '[name].[contenthash].js',
    path: path.resolve(root, 'public', 'assets'),
  },
  externals: [
    {
      // 字符串
      react: 'react',
      'react-dom': 'react-dom',
      redux: 'redux',
      'react-redux': 'react-redux',
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

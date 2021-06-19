const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const root = path.dirname(__dirname);

module.exports = {
  mode: 'development',
  entry: {
    style: path.resolve(root, './src/pages/publish/index.css'),
    main: path.resolve(root, './src/pages/publish/index.js'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(root, 'publish'),
    open: true,
    port: '8081',
    writeToDisk: true,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(root, 'publish'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, './src/pages/publish/index.html'),
      filename: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(root, './src/pages/publish/require.js'),
          to: path.resolve(root, 'publish', 'require.js'),
        },
        {
          from: path.resolve(
            root,
            './node_modules/react/umd/react.development.js',
          ),
          to: path.resolve(root, 'publish', 'react.development.js'),
        },
        {
          from: path.resolve(
            root,
            './node_modules/react-dom/umd/react-dom.development.js',
          ),
          to: path.resolve(root, 'publish', 'react-dom.development.js'),
        },
        {
          from: path.resolve(root, './node_modules/redux/dist/redux.js'),
          to: path.resolve(root, 'publish', 'redux.js'),
        },
        {
          from: path.resolve(
            root,
            './node_modules/react-redux/dist/react-redux.js',
          ),
          to: path.resolve(root, 'publish', 'react-redux.js'),
        },
      ],
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
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

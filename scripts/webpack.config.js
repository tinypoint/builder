const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.dirname(__dirname);

module.exports = {
  mode: 'development',
  entry: {
    dashboard: path.resolve(root, './src/pages/dashboard/index.ts'),
    editor: path.resolve(root, './src/pages/editor/index.ts'),
    client: path.resolve(root, './src/pages/client/index.ts'),
		'editor.worker': path.resolve(root, 'node_modules', 'monaco-editor/esm/vs/editor/editor.worker.js'),
		'json.worker': path.resolve(root, 'node_modules', 'monaco-editor/esm/vs/language/json/json.worker'),
		'css.worker': path.resolve(root, 'node_modules', 'monaco-editor/esm/vs/language/css/css.worker'),
		'html.worker': path.resolve(root, 'node_modules', 'monaco-editor/esm/vs/language/html/html.worker'),
		'ts.worker': path.resolve(root, 'node_modules', 'monaco-editor/esm/vs/language/typescript/ts.worker')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(root, 'dist'),
    open: true,
    proxy: {
      '/api': 'http://localhost:8082',
    },
  },
  output: {
    globalObject: 'self',
    filename: (pathData) => {
      return pathData.chunk.name.match(/\.worker$/)? '[name].bundle.js' : '[name].[contenthash].js';
    },
    path: path.resolve(root, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, './src/pages/dashboard/index.html'),
      filename: './index.html',
      chunks: ['dashboard'],
    }),
    new HtmlWebpackPlugin({
      title: 'create',
      template: path.resolve(root, './src/pages/editor/index.ejs'),
      filename: './create/index.html',
      chunks: ['editor'],
    }),
    new HtmlWebpackPlugin({
      title: 'editor',
      template: path.resolve(root, './src/pages/editor/index.ejs'),
      filename: './editor/index.html',
      chunks: ['editor'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, './src/pages/client/index.html'),
      filename: './client/index.html',
      chunks: ['client'],
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
        test: /\.(sc|sa|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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

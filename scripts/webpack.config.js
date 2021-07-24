const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.dirname(__dirname);

module.exports = {
  mode: 'development',
  entry: {
    'normalize.css': path.resolve(root, 'node_modules', 'normalize.css/normalize.css'),
    'blueprint.core.css': path.resolve(root, 'node_modules', '@blueprintjs/core/lib/css/blueprint.css'),
    'blueprint.icon.css': path.resolve(root, 'node_modules', '@blueprintjs/icons/lib/css/blueprint-icons.css'),
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
    openPage: 'builder/dashboard',
    open: true,
    proxy: {
      '/api': 'http://localhost:8082',
      '/builder/static': 'http://localhost:8082',
      '/builder/objectstorage': 'http://localhost:8082',
    },
  },
  output: {
    globalObject: 'self',
    filename: (pathData) => {
      return pathData.chunk.name.match(/\.worker$/)? './builder/[name].bundle.js' : './builder/[name].[contenthash].js';
    },
    assetModuleFilename: './builder/assets/[hash][ext][query]',
    path: path.resolve(root, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, './src/pages/dashboard/index.html'),
      filename: './builder/dashboard/index.html',
      chunks: ['dashboard'],
    }),
    new HtmlWebpackPlugin({
      title: 'create',
      template: path.resolve(root, './src/pages/editor/index.ejs'),
      filename: './builder/create/index.html',
      chunks: ['normalize.css', 'blueprint.core.css', 'blueprint.icon.css', 'editor'],
    }),
    new HtmlWebpackPlugin({
      title: 'editor',
      template: path.resolve(root, './src/pages/editor/index.ejs'),
      filename: './builder/editor/index.html',
      chunks: ['normalize.css', 'blueprint.core.css', 'blueprint.icon.css', 'editor'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, './src/pages/client/index.html'),
      filename: './builder/client/index.html',
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

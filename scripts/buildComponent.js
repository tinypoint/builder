const webpack = require('webpack')
const fs = require('fs');
const path = require('path');
const webpackConfig = require('./webpack.components.config');
const root = path.dirname(__dirname);
const componentDirPath = path.resolve(root, './src/pages/client/components/Renderer/components/')

const dirs = fs.readdirSync(componentDirPath)

dirs.forEach(componentName => {

  const compiler = webpack({
    ...webpackConfig,
    entry: {
      [componentName]: path.resolve(componentDirPath, componentName)
    }
  })

  compiler.run((stats) => {
    console.log(stats)
  })
})





const webpack = require('webpack')
const fs = require('fs');
const path = require('path');
const webpackConfig = require('./webpack.components.config');
const root = path.dirname(__dirname);
const componentDirPath = path.resolve(root, './src/components/')
const axios = require('axios');

const dirs = fs.readdirSync(componentDirPath)
// const dirs = ['button']
dirs.forEach(componentName => {

  const compiler = webpack({
    ...webpackConfig,
    stats: 'summary',
    entry: {
      [componentName]: path.resolve(componentDirPath, componentName)
    }
  })

  console.log('bundle start')
  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    console.log(stats.toString({
      colors: true,
    }))

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    compiler.close(() => {
      console.log('bundle end')
      axios.put('http://localhost:8082/api/component/', {
        name: componentName,
        path: 'assets/' + stats.toJson().assetsByChunkName[componentName][0]
      }).then(() =>{
        console.log('put success')
      })
    });
  })
})





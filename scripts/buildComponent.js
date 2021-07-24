const webpack = require('webpack')
const path = require('path');
const webpackConfig = require('./webpack.components.config');
const axios = require('axios');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const entrys = argv._.map(entry => {
  const index = entry.split(path.sep).join('/').lastIndexOf("\/");
  const name = entry.substring(index + 1, entry.length);

  return {
    name,
    path: path.resolve(process.cwd(), entry)
  }
})

entrys.forEach(entry => {

  const compiler = webpack({
    ...webpackConfig,
    stats: 'summary',
    entry: {
      [entry.name]: entry.path
    }
  })

  console.log(`[${entry.name}] bundle start`)
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
      console.log(`[${entry.name}] bundle end`)
      axios.put('http://localhost:8082/builder/api/component/', {
        name: entry.name,
        path: '/builder/objectstorage/components/' + stats.toJson().assetsByChunkName[entry.name][0]
      }).then(() => {

        console.log(`[${entry.name}] put success`)
      })
    });
  })
})





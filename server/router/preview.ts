import Koa from 'koa';
import Router from 'koa-router';
import ejs from 'ejs';
import path from 'path';

const router = new Router();

const _traverse = (
  schema: any,
  callback: (schema: any) => boolean,
  option = { deep: true },
) => {
  callback(schema);

  const { children = [] } = schema;
  for (let i = 0, len = children.length; i < len; i += 1) {
    _traverse(children[i], callback, option);
  }
};

router.get('/preview/:id', async (ctx: Koa.Context) => {
  const { id } = ctx.params;

  const record = await ctx.mongo.PagesRecords.findOne({
    page: id,
  });

  const names: string[] = ['main'];

  let css = '';

  _traverse(record.schema, (schema: any) => {
    if (names.indexOf(schema.type) < 0) {
      names.push(schema.type);
    }

    const { styles = {} } = schema;
    Object.keys(styles).forEach((identifier) => {
      const cssRules = styles[identifier];
      css += `${identifier} { `;
      Object.keys(cssRules).forEach((key: string) => {
        css += `  ${key}: ${cssRules[key]};`;
      });
      css += ' }';
    });

    return true;
  });

  css += record.layoutCss || '';

  const components = await ctx.mongo.Components.find({
    name: { $in: names },
  });

  const host = 'http://127.0.0.1:8002';

  const paths: any = {
    react: `${host}/assets/libs/react.development`,
    'react-dom': `${host}/assets/libs/react-dom.development`,
    redux: `${host}/assets/libs/redux`,
    'react-redux': `${host}/assets/libs/react-redux`,
  };

  components.forEach((component: any) => {
    paths[component.name] = `${host}/${component.path.replace(/\.js$/, '')}`;
  });

  try {
    ctx.body = await new Promise((resolve, reject) => {
      ejs.renderFile(path.resolve(__dirname, 'index.ejs'), {
        paths,
        schema: record.schema,
        css,
      }, {}, (err, str) => {
        if (err) {
          reject(err);
        }
        resolve(str);
      });
    });
  } catch (err) {
    ctx.body = 'error';
  }
});

export default router;

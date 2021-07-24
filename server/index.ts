import Koa from 'koa';
import koaBody from 'koa-body';
import dashboard from './router/dashboard';
import component from './router/component';
import form from './router/form';
import preview from './router/preview';
import template from './router/template';
import file from './router/file';
import mongoose from './mongoose';

(async function main() {
  const mods = [mongoose];
  const app = new Koa();

  app.use(koaBody({
    multipart: true,
    formidable: {
      hash: 'md5',
    },
  }));

  for (let i = 0, len = mods.length; i < len; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await mods[i](app);
  }

  const routes = [dashboard, component, form, preview, template, file];
  for (let i = 0, len = routes.length; i < len; i += 1) {
    app.use(routes[i].routes())
      .use(routes[i].allowedMethods());
  }

  app.listen(8082);
  console.log('start');
}());

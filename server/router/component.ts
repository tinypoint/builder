import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.get('/api/component/list', async (ctx: Koa.Context) => {
  const { skip = 0, limit = 0 } = ctx.request.query;

  const components = await ctx.mongo.Components.find({}).skip(skip).limit(limit);

  ctx.body = {
    status: 0,
    data: components,
  };
});

router.put(['/api/component/', '/api/component'], async (ctx: Koa.Context) => {
  const { name, path } = ctx.request.body;

  if (name && path) {
    const prev = await ctx.mongo.Components.findOne({
      name,
    }).exec();

    if (!prev) {
      await new ctx.mongo.Components({
        name,
        path,
      }).save();
    } else {
      await ctx.mongo.Components.updateOne({
        name,
      }, {
        path,
      });
    }

    ctx.body = {
      status: 0,
      data: {

      },
    };
  } else {
    ctx.body = {
      status: 1,
      data: {
      },
    };
  }
});

export default router;

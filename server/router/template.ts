import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.get('/builder/api/template/list', async (ctx: Koa.Context) => {
  ctx.body = {
    status: 0,
    data: [],
  };
  // const { skip = 0, limit = 0 } = ctx.request.query;

  // const templates = await ctx.mongo.Templates.find({}).skip(skip).limit(limit);

  // ctx.body = {
  //   status: 0,
  //   data: templates,
  // };
});

router.put(['/builder/api/template/', '/builder/api/template'], async (ctx: Koa.Context) => {
  const { template } = ctx.request.body;

  if (template && template.length) {
    const res = await new ctx.mongo.Templates({
      template,
    }).save();

    ctx.body = {
      status: 0,
      data: res._id,
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

import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.get('/api/component/list', async (ctx: Koa.Context) => {
  const { offset = undefined, limit = undefined } = ctx.request.query;

  const components = await ctx.sequelize.models.components.findAll({
    offset,
    limit,
  });

  ctx.body = {
    status: 0,
    data: components,
  };
});

router.put(['/api/component/', '/api/component'], async (ctx: Koa.Context) => {
  const { name, path } = ctx.request.body;

  if (name && path) {
    const prev = await ctx.sequelize.models.components.findOne({
      where: {
        name,
      },
    });

    if (!prev) {
      await ctx.sequelize.models.components.create({ name, path });
    } else {
      await ctx.sequelize.models.components.update({
        path,
      }, {
        where: {
          name,
        },
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

import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.get('/builder/api/page/info/:id', async (ctx: Koa.Context) => {
  const { id } = ctx.params;

  const page = await ctx.sequelize.models.pages.findOne({
    where: {
      id,
    },
    include: 'pagesrecords',
  });

  ctx.body = {
    status: 0,
    data: page,
  };
});

router.get('/builder/api/page/list', async (ctx: Koa.Context) => {
  const { skip = 0, limit = 10 } = ctx.request.query;

  const pages = await ctx.sequelize.models.pages.findAll({
    offset: skip,
    limit,
  });

  ctx.body = {
    status: 0,
    data: pages,
  };
});

router.post('/builder/api/page/create', async (ctx: Koa.Context) => {
  const { schema, scriptText = '' } = ctx.request.body;

  const page = await ctx.sequelize.models.pages.create({});

  if (page.id) {
    const record = await ctx.sequelize.models.pagesrecords.create({
      pageId: page.id,
      schema,
      status: 'editing',
      scriptText,
    });

    if (record.id) {
      ctx.body = {
        status: 0,
        data: {
          pageid: page.id,
          recordid: record.id,
        },
      };
    } else {
      ctx.body = {
        status: 1,
        data: {
          pageid: page.id,
        },
      };
    }
  } else {
    ctx.body = {
      status: 1,
      data: {
      },
    };
  }
});

router.post('/builder/api/page/save', async (ctx: Koa.Context) => {
  const {
    schema, id, scriptText = '', layoutCss,
  } = ctx.request.body;

  if (id) {
    await ctx.sequelize.models.pagesrecords.update({
      schema,
      scriptText,
      layoutCss,
    }, {
      where: {
        id,
      },
    });

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

router.delete('/builder/api/page/:id', async (ctx: Koa.Context) => {
  const { id } = ctx.params;
  await ctx.mongo.Pages.deleteOne({ _id: id });
  await ctx.mongo.PagesRecords.deleteMany({ page: id });
  ctx.body = {
    status: 0,
  };
});

export default router;

import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.get('/api/page/info/:id', async (ctx: Koa.Context) => {
  const { id } = ctx.params;

  const page = await ctx.mongo.Pages.findById(id);
  const records = await ctx.mongo.PagesRecords.find({
    page: id,
  });

  ctx.body = {
    status: 0,
    data: {
      page,
      records,
    },
  };
});

router.get('/api/page/list', async (ctx: Koa.Context) => {
  const { skip = 0, limit = 10 } = ctx.request.query;

  const pages = await ctx.mongo.Pages.find({}).skip(skip).limit(limit);

  ctx.body = {
    status: 0,
    data: pages,
  };
});

router.post('/api/page/create', async (ctx: Koa.Context) => {
  const { schema, scriptText = '' } = ctx.request.body;

  const page = new ctx.mongo.Pages({
    name: '',
  });

  await page.save();

  if (page._id) {
    const record = new ctx.mongo.PagesRecords({
      page: page._id,
      schema,
      status: 'editing',
      scriptText,
    });

    await record.save();

    if (record._id) {
      ctx.body = {
        status: 0,
        data: {
          pageid: page._id,
          recordid: record._id,
        },
      };
    } else {
      ctx.body = {
        status: 1,
        data: {
          pageid: page._id,
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

router.post('/api/page/save', async (ctx: Koa.Context) => {
  const {
    schema, _id, scriptText = '', layoutCss,
  } = ctx.request.body;

  if (_id) {
    await ctx.mongo.PagesRecords.updateOne({
      _id,
      schema,
      scriptText,
      layoutCss,
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

router.delete('/api/page/:id', async (ctx: Koa.Context) => {
  const { id } = ctx.params;
  await ctx.mongo.Pages.deleteOne({ _id: id });
  await ctx.mongo.PagesRecords.deleteMany({ page: id });
  ctx.body = {
    status: 0,
  };
});

export default router;

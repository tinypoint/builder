import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.post('/api/form/submit', async (ctx: Koa.Context) => {
  console.log(ctx.request.body);

  ctx.body = {
    status: 0,
    data: ctx.request.body,
  };
});

export default router;

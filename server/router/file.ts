import Koa from 'koa';
import Router from 'koa-router';
import moveFile from 'move-file';
import path from 'path';
import mime from 'mime-types';

const router = new Router();

router.post('/api/file/upload', async (ctx: Koa.Context) => {
  const { files } = ctx.request;
  if (files && files.files) {
    const file = files.files as any;

    const ext = mime.extension(file.type);
    const filename = `${file.hash}.${ext}`;
    await moveFile(file.path, path.resolve(__dirname, '..', '..', 'server', 'tos', 'builder', 'static', 'images', filename));
    ctx.body = {
      status: 0,
      data: {
        path: `/builder/static/images/${filename}`,
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
import Koa from 'koa';
import mongoose from 'mongoose';
import Pages from './schemas/pages';
import PagesRecords from './schemas/pages_records';
import Components from './schemas/components';
import Templates from './schemas/templates';

const connect = () => new Promise<void>((resolve) => {
  mongoose.connect('mongodb://localhost/builder', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongo connection error:'));
  db.once('open', () => {
    console.info('mongo connection success');
    resolve();
  });
});

export default async (app: Koa) => {
  await connect();
  app.context.mongo = {
    Pages,
    PagesRecords,
    Components,
    Templates,
  };
};

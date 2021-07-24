import Koa from 'koa';
import { Sequelize } from 'sequelize';
import Pages from './models/pages';
import Components from './models/components';
import Templates from './models/templates';

const models = [
  Pages,
  Components,
  Templates,
];

const connect = async () => {
  const isProd = (process.env.NODE_ENV || '').trim().toLowerCase() === 'production';

  const username = isProd ? '' : (process.env.MYSQL_USERNAME || '').trim();
  const password = isProd ? '' : (process.env.MYSQL_PASSWORD || '').trim();
  const host = isProd ? '127.0.0.1' : (process.env.MYSQL_HOST || '').trim();
  const database = isProd ? '' : (process.env.MYSQL_DATABASE || '').trim();

  const sequelize = new Sequelize({
    username,
    password,
    host,
    port: 3306,
    database,
    dialect: 'mysql',
    define: {
      freezeTableName: true, // Enforcing the table name to be equal to the model name
    },
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelize;
};

export default async (app: Koa) => {
  const sequelize = await connect();

  models.forEach((model) => {
    model(sequelize);
  });

  await sequelize.sync();

  app.context.sequelize = sequelize;
};

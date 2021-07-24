import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  const pages = sequelize.define('pages', {
    name: {
      type: DataTypes.STRING,
      defaultValue: 'Unnamed Project',
    },
  }, {

  });

  const pagesrecords = sequelize.define('pagesrecords', {
    schema: { type: DataTypes.JSON },
    scriptText: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM,
      values: ['editing'],
    },
    layoutCss: { type: DataTypes.STRING }, // 布局样式
  }, {

  });

  pages.hasMany(pagesrecords);

  pagesrecords.belongsTo(pages);
};

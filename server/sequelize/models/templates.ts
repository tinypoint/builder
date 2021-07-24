import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  sequelize.define('templates', {
    template: {
      type: DataTypes.JSON,
    },
    path: {
      type: DataTypes.STRING,
    },
  });
};

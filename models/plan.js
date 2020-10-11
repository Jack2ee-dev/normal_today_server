'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Plan.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      // define association here
    }
  }
  Plan.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      createdAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Plan',
    }
  );
  return Plan;
};

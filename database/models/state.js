'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.belongsTo(models.Country, {
        foreignKey: 'countryId'
      })
      State.hasMany(models.City, {
        foreignKey: 'stateId'
      })
    }
  }
  State.init({
    countryId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'State',
    tableName: 'States'
  });
  return State;
};
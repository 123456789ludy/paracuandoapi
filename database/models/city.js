'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.belongsTo(models.State,{
        foreignKey: 'stateId'
      })

      City.hasMany(models.Publication, {
        foreignKey: 'cityId'
      })
        
      
    }
  }
  City.init({
    stateId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'Cities'
  });
  return City;
};
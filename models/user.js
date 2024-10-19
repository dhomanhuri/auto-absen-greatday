'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    auth_token: DataTypes.STRING,
    empId: DataTypes.STRING,
    phone: DataTypes.STRING,
    keywa: DataTypes.STRING,
    clock_in: DataTypes.STRING,
    clock_out: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
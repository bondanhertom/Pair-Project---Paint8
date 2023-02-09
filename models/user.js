'use strict';
const bcrypt = require('bcryptjs');
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
      User.hasOne(models.Profile);
      User.hasMany(models.Post);
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  },
    {
      hooks: {
        beforeCreate(instence, option) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(instence.password, salt);
          instence.password = hash
        }
      },
      sequelize,
      modelName: 'User',
    });
  return User;
};
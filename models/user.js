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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Username cannot be Null`,
        },
        notEmpty: {
          msg: `Username cannot be Empty`,
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        notNull: {
          msg: `Email cannot be Null`,
        },
        notEmpty: {
          msg: `Email cannot be Empty`,
        },
      },
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Role cannot be Null`,
        },
      }
    }
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
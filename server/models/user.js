'use strict';

const { hash } = require('../helpers/bcrypt-pass')
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
      User.hasMany(models.Todo)
    }
  };

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please enter your name!!'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your name!!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email has already exist!!'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Please enter your email!!'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your email!!'
        },
        isEmail: {
          args: true,
          msg: 'Format email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please enter your password!!'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your password!!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option) => {
    instance.password = hash(instance.password)
  })

  return User;
};
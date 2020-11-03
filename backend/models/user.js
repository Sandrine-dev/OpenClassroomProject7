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
      models.User.hasMany(models.Message);

      models.User.hasMany(models.Commentaire);
    }
  };
  User.init({
    email: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    poste: DataTypes.STRING,
    password: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    photo_alt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
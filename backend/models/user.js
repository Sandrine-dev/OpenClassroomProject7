'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    poste: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, { 

  });

  /*User.associate = function(models) {
    User.hasMany(models.Message, {
      onDelete: 'cascade', 
      hooks: true
    })
    User.hasMany(models.Commentaire, {
      onDelete: 'cascade',
      hooks: true
    })
  }*/
  return User;
};
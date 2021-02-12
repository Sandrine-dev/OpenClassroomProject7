'use strict';

module.exports = (sequelize, DataTypes) => {
  var Commentaire = sequelize.define('Commentaire', {
      commentaire: DataTypes.STRING,
  });

  Commentaire.associate = (models) => {
    Commentaire.belongsTo(models.Message, {
      foreignKey: 'messageId',
      as: 'message',
    })

    Commentaire.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return Commentaire;
};
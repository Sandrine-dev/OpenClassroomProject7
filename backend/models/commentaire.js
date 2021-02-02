'use strict';

module.exports = (sequelize, DataTypes) => {
  var Commentaire = sequelize.define('Commentaire', {
      commentaire: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      messageId: DataTypes.INTEGER
  }, {
    });
    Commentaire.associate = (models) => {
      Commentaire.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      Commentaire.belongsTo(models.Message, {
      foreignKey: 'messageId',
      as: 'message',
      });
    };

    /*classMethods: {
      associate: function(models) {
         // define association here
     models.Commentaire.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      models.Commentaire.belongsTo(models.Message, {
        foreignKey: 'messageId'
      })
    }
  }
});*/
  return Commentaire;
};
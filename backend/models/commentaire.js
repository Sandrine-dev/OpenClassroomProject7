'use strict';

module.exports = (sequelize, DataTypes) => {
  var Commentaire = sequelize.define('Commentaire', {
    	commentaire: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
         // define association here
     models.Commentaire.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      models.Commentaire.belongsTo(models.Message, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
});
  return Commentaire;
};
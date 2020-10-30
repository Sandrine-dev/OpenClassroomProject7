'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.commentaire.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        }
      })
      models.commentaire.belongsTo(models.message , {
        foreignKey: {
          allowNull: false,
        }
      })
    }
  };
  commentaire.init({
    iduser: DataTypes.INTEGER,
    idmessage: DataTypes.INTEGER,
    commentaire: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentaire',
  });
  return commentaire;
};
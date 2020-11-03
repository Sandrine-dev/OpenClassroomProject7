'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.hasMany(models.commentaire);

      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Message.init({
    idUSERS: DataTypes.INTEGER,
    message: DataTypes.STRING,
    image_url: DataTypes.STRING,
    image_alt: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
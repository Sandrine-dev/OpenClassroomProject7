'use strict';

module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
   	  message: DataTypes.STRING,
    	attachement: DataTypes.STRING,
  });

  Message.associate = function(models) {
    Message.hasMany(models.Commentaire, {
      foreignKey: 'messageId',
      as: 'comments',
      onDelete: 'cascade',
      hooks: true
    })
    Message.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }
  
  return Message;
};
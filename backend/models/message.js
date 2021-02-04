'use strict';

module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
   	  message: DataTypes.STRING,
    	attachement: DataTypes.STRING,
      likes: DataTypes.INTEGER
  }, {

  });
    Message.associate = (models) => {

      Message.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Message.hasMany(models.Commentaire, {
        foreignKey: 'messageId'
      });
    };
    /*classMethods: {
      associate: function(models) {
         // define association here
        models.Message.hasMany(models.commentaire);
        models.Message.belongsTo(models.User, {foreignKey: "userId"});
      }
    }
  });*/
  return Message;
};
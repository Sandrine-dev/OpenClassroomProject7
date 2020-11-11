'use strict';

module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
   	  message: DataTypes.STRING,
    	image_url: DataTypes.STRING,
    	image_alt: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
  }, {

  });
    Message.associate = (models) => {
      Message.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Message.hasMany(models.Commentaire, {
        foreignKey: 'message.id'
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
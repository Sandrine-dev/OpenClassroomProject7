'use strict';

module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
 	idUSERS: DataTypes.INTEGER,
   	 message: DataTypes.STRING,
    	image_url: DataTypes.STRING,
    	image_alt: DataTypes.STRING,
    	likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
         // define association here
        models.Message.hasMany(models.commentaire);

        models.Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Message;
};
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
static associate(models) {
  SpotImage.belongsTo(models.Spot, {
    foreignKey: "spotId",
    onDelete: "CASCADE"
  })
  }
}
SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
<<<<<<< HEAD
      references: {
        model: "Spot",
        key: "id",
        onDelete: "CASCADE"
      }
    },
=======
     },
>>>>>>> 872be6c71c9ef7432a298e230f60110272623b6d
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },{
    sequelize,
    modelName: "SpotImage",});
return SpotImage;
};

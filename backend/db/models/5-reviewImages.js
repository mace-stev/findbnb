const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, { 
        foreignKey: "reviewId", 
        onDelete: "CASCADE"
      });
    }
  }
  
  ReviewImage.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allownull: false
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "Reviews",
        key: "id",
        onDelete: "CASCADE"
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  }, {
    sequelize,
    modelName: "ReviewImage",
  });

  return ReviewImage;
};
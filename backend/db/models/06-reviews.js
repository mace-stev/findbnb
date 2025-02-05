const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { 
        foreignKey: 'userId' });
      Review.belongsTo(models.Spot, {
         foreignKey: 'spotId' });
      Review.hasMany(models.ReviewImage, 
        { foreignKey: 'reviewId' });
    }
  }
  
  Review.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  }, {
    sequelize,
    modelName: 'Review',
  });

  return Review;
};
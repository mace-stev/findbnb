const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId', 
      onDelete: "CASCADE"
    });
      Review.belongsTo(models.Spot, {
         foreignKey: 'spotId',
        onDelete: "CASCADE"
       });
      
      Review.hasMany(models.ReviewImage,
        { foreignKey: 'reviewId' });
    }
  }

  Review.init({
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len:[1, 500]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "Users",
        key: "id",
        onDelete: "CASCADE"
      }
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Spots",
        key: "id",
        onDelete: "CASACADE"
      }
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

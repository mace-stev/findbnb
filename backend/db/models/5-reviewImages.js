const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, { foreignKey: "reviewId" });
    }
  }

  ReviewImage.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: "ReviewImage",
    }
  );

  return ReviewImage;
};

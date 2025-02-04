const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ReviewImage extends Model {
    static associate(models) {
   // define association here
    }
  }
  ReviewImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });

  return ReviewImage;
};
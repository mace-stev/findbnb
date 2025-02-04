const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SpotImage extends Model {
    static associate(models) {
      // define association here
    }
  }
  
  SpotImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });

  return SpotImage;
};
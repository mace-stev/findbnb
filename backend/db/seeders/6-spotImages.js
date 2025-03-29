'use strict';

const { SpotImage } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://onekindesign.com/wp-content/uploads/2019/10/Traditional-English-Manor-House-Jauregui-Architect-01-1-Kindesign.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://static.schumacherhomes.com/umbraco/media/wvflutbh/image4.jpg?format=webp",
        preview: true
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};

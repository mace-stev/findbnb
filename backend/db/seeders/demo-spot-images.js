'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

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
        url: "https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.stockvault.net",
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

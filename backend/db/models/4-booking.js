"use strict";
const { Model } = require("sequelize");
// const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      });
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
    }
  }

  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Spots",
          key: "id",
          onDelete: "CASCADE"
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          onDelete: "CASCADE"
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isBeforeEndDate(value) {
            if (this.endDate <= this.startDate) {
              throw new Error("startDate must be before endDate");
            }

          },
        },
      },

      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      }

    },
    {
      sequelize,
      modelName: "Booking",
    }
  );

  return Booking;
};

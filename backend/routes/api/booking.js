const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Booking, User } = require("../../db/models");
const { EmptyResultError } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateBooking = [
    check('startDate')
      // .isISO8601().withMessage('startDate must be a valid date')
      .custom(value => {
        if (new Date(value) < new Date()) {
          throw new Error('startDate cannot be in the past');
        }
        return true;
      }),
    check('endDate')
      // .isISO8601().withMessage('endDate must be a valid date')
      .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
          throw new Error('endDate cannot be on or before startDate');
        }
        return true;
      }),
  handleValidationErrors
];

const validateBookingId = (req, res, next) => {
  const { bookingId } = req.params;
  if (!Number.isInteger(Number(bookingId))) {
      return res.status(400).json({
          message: "Validation error",
          errors: { id: "bookingId must be a valid integer" },
      });
  }
  next();
};


  router.get("/current", async (req, res, next) => {
    try {


      const allBookings = await Booking.findAll({
        where: {
          userId: req.user.id
        },
        include:{
            model: Spot
        }
      });
      let allBookingsData = allBookings.map(booking => booking.toJSON());
      let correctBookingsData= allBookingsData.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: booking.Spot,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }))
      res.json(correctBookingsData);
    } catch (e) {
      next(e);
    }
  });



router.put("/:bookingId", validateBooking, validateBookingId, requireAuth, async(req, res, next) => {
    try {
        const { bookingId } = req.params;
        const { startDate, endDate } = req.body;

        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
          return res.status(404).json({ message: "Booking couldn't be found" });
        }

        if (booking.userId !== req.user.id) {
          return res.status(403).json({ message: "Forbidden" });
        }

        const spotId = booking.spotId;

        const newBooking = await booking.update({
          spotId,
          userId: req.user.id,
          startDate,
          endDate
        });

        return res.status(200).json({
          id: newBooking.id,
          spotId: Number(newBooking.spotId),
          userId: req.user.id,
          startDate: newBooking.startDate,
          endDate: newBooking.endDate,
          createdAt: newBooking.createdAt,
          updatedAt: newBooking.updatedAt,


        });
      } catch (e) {
        next(e);
      }

})

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }
        await booking.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;

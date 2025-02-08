const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Booking } = require("../../db/models");
const { EmptyResultError } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateBooking = [
  check("review").notEmpty().withMessage("Review text is required"),
  check("stars").isInt({ min: 1, max: 5 }),
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
      res.json(allBookings);
    } catch (e) {
      next(e);
    }
  });


router.put("/:bookingId", validateBooking, validateBookingId, requireAuth, async(req, res, next) => {
  const {bookingId} = req.params;
  const {review, stars} = req.body;

  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    await booking.update({
      review,
      stars
    });
    return res.status(200).json({
      id: booking.id,
      spotId: Number(booking.spotId),
      userId: req.user.id,
      review: booking.review,
      stars: booking.stars,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    })
  } catch (e) {
    next(e);
  }
})

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const review = await Review.findByPk(bookingId);
    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        await review.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;

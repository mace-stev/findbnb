// const express = require("express");

// const { restoreUser, requireAuth } = require("../../utils/auth");
// const { Spot, Review } = require("../../db/models");
// const { EmptyResultError } = require("sequelize");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
// const router = express.Router();


//   router.get("/current", async (req, res, next) => {
//     try {


//       const allUserReviews = await Review.findAll({
//         where: {
//           userId: req.user.id
//         },
//         include:{
//             model: Spot
//         }
//       });
//       res.json(allUserReviews);
//     } catch (e) {
//       next(e);
//     }
//   });

//   module.exports= router
const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Review } = require("../../db/models");

const router = express.Router();

const validateSpotId = (req, res, next) => {
  const { spotId } = req.params;
  if (!Number.isInteger(Number(spotId))) {
    return res.status(400).json({
      message: "Validation error",
      errors: { id: "spotId must be a valid integer" },
    });
  }
  next();
};

const validateReview = [
  check("review").notEmpty().withMessage("Review text is required"),
  check("stars").isInt({ min: 1, max: 5 }),
];

router.post(
  "/:spotId/reviews",
  validateSpotId,
  validateReview,
  requireAuth,
  async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const { review, stars } = req.body;

      const spot = await Spot.findByPk(spotId);
      if (!spotId) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const newReview = await Review.create({
        spotId,
        review,
        stars,
      });

      return res.status(201).json({
        id: newReview.id,
        review: newReview.review,
        stars: newReview.stars,
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;

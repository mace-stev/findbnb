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

//   module.exports = router

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

const { restoreUser, requireAuth, setTokenCookie } = require("../../utils/auth");
const { Spot, SpotImage, Review } = require("../../db/models");
const { EmptyResultError } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const bcrypt = require("bcryptjs");

const validateReview = [
  check("review").notEmpty().withMessage("Review text is required"),
  check("stars").isInt({ min: 1, max: 5 }),
  handleValidationErrors
];

const validateReviewId = (req, res, next) => {
  const { reviewId } = req.params;
  if (!Number.isInteger(Number(reviewId))) {
      return res.status(400).json({
          message: "Validation error",
          errors: { id: "reviewId must be a valid integer" },
      });
  }
  next();
};

router.put("/:reviewId", validateReview, validateReviewId, requireAuth, async(req, res, next) => {
  const {reviewId} = req.params;
  const {review, stars} = req.body;

  const currentReview = await Review.findByPk(reviewId);
  if (!currentReview) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (currentReview.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    await currentReview.update({
      review,
      stars
    });
    return res.status(200).json({
      id: currentReview.id,
      spotId: Number(currentReview.spotId),
      userId: req.user.id,
      review: currentReview.review,
      stars: currentReview.stars,
      createdAt: currentReview.createdAt,
      updatedAt: currentReview.updatedAt,
    })
  } catch (e) {
    next(e);
  }
})

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
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

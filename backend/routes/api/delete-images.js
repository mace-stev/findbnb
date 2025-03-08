const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, ReviewImage } = require("../../db/models");

const router = express.Router();

router.delete("/spot-images/:imageId", requireAuth, async (req, res, next) => {
  const { imageId } = req.params;
  const image = await SpotImage.findByPk(imageId);
  if (!image) {
    return res.status(404).json({ message: "Image couldn't be found" });
  }

  const spot = await Spot.findByPk(image.spotId);
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/review-images/:imageId",
  requireAuth,
  async (req, res, next) => {
    const { imageId } = req.params;
    const image = await ReviewImage.findByPk(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image couldn't be found" });
    }

    const review = await Review.findByPk(image.reviewId);
    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      await image.destroy();
      return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;

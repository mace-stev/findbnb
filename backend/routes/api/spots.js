const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage } = require("../../db/models");
const { EmptyResultError } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
  } catch (e) {
    next(e);
  }
});


router.get("/current", async (req, res, next) => {
  try {
   
    if (!req.user.id) {
      const userError = new Error("User must be signed in");
      userError.status = 403;
      throw userError;
    }
    const oneSpot = await Spot.findAll({
      where: {
        ownerId: req.user.id,
      },
    });
    res.json(oneSpot);
  } catch (e) {
    next(e);
  }
});

router.get("/:spotId", async (req, res, next) => {
  try {
    const oneSpot = await Spot.findOne({
      where: {
        id: req.params.spotId,
      },
    });
    res.json(oneSpot);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const ownerId = req.user.id;

    const spot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    return res.json({
      id: spot.id,
      ownerId: ownerId,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });

    }

    const newImage = await SpotImage.create({
      spotId,
      url,
      preview,
    });

    return res.status(200).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (e) {
    next(e);
  }
});

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

const validateSpot = [
  check("address").notEmpty().withMessage("Address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name must be 50 characters or less"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  handleValidationErrors,
];

router.put(
  "/:spotId",
  validateSpot,
  validateSpotId,
  requireAuth,
  async (req, res, next) => {
    const { spotId } = req.params;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      });

      return res.status(200).json({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    await spot.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage } = require("../../db/models");
const { EmptyResultError } = require("sequelize");

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
    console.log(req.user.id);
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

router.put("/:spotId", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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
});

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

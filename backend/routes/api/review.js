const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review } = require("../../db/models");
const { EmptyResultError } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();


  router.get("/current", async (req, res, next) => {
    try {
     
    
      const allUserReviews = await Review.findAll({
        where: {
          userId: req.user.id
        },
        include:{
            model: Spot
        }
      });
      res.json(allUserReviews);
    } catch (e) {
      next(e);
    }
  });

  module.exports= router
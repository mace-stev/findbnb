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

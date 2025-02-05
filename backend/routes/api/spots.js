const express = require('express');


const { restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allSpots = await Spot.findAll()
        res.json(allSpots)
    } catch (err) {
        next(err)
    }
})
router.get('/current', async (req, res) => {
    try {
        const oneSpot = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
        })
        res.json(oneSpot)
    } catch (err) {
        next(err)
    }
})

router.get('/:spotId', async (req, res) => {
    try {
        const oneSpot = await Spot.findOne({
            where: {
                id: req.params.spotId
            }
        })
        res.json(oneSpot)
    }
    catch (err) {
        next(err)
    }
})


router.post("/:spotId/images", requireAuth, async (req, res) => {
    try {
        const { spotId } = req.params;
        const { url, preview } = req.body;

        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
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
    } catch (err) {
        next(err)
    }
});

router.post(
    '/',
    async (req, res) => {
        try {
            const { address, city, state, country, lat, lng, name, description, price } = req.body;
            const ownerId = req.user.id


            const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });



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
                updatedAt: spot.updatedAt
            })
        } catch (err) {
            next(err)
        }

    }
);

module.exports = router;

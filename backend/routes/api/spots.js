const express = require('express');


const { restoreUser, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

// Sign up

router.post(
    '/spots',
    async (req, res) => {
        router.use(restoreUser)
        router.use(requireAuth)
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price });



       return res.json({
            id: spot.id,
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

        
    }
);

module.exports = router;

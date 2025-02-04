const express = require('express');


const { restoreUser, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/', async(req, res)=>{
    const allSpots= await Spot.findAll()
    res.json(allSpots)
})


router.get('/:spotId', async(req, res)=>{
    const oneSpot= await Spot.findOne({
        where:{
            id: req.params.spotId
        }
    })
    res.json(oneSpot)
})

router.get('/current', async(req, res)=>{
    const oneSpot= await Spot.findAll({
        where:{
            ownerId: req.user.id
        }
    })
    res.json(oneSpot)
})
router.post(
    '/',
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const ownerId= req.user.id
        
    
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

        
    }
);

module.exports = router;

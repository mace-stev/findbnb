const express = require("express");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage } = require("../../db/models");

const router = express.Router();


router.get('/', async(req, res)=>{
    try{
        
    const allSpots= await Spot.findAll()
    res.json(allSpots)
    catch(e){
        next(e);    
    }
})
router.get('/current', async(req, res)=>{
    try{
        
    console.log(req.user.id)
        if(!req.user.id){
            const userError = new Error("User must be signed in")
            userError.status = 403;
            throw userError;
            
        }
    const oneSpot= await Spot.findAll({
        where:{
            ownerId: req.user.id
        }
    })
    res.json(oneSpot)
    catch(e){
        next(e);
        
    }
})

router.get('/:spotId', async(req, res)=>{
    const oneSpot= await Spot.findOne({
        where:{
            id: req.params.spotId
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
  
  router.post("/:spotId/images", requireAuth, async (req, res) => {
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
});

module.exports = router;

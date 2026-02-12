require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwtverify = require('../middleware');



router.post('/getweather',jwtverify,async(req,res)=>{
    const {searchresults} = req.body;
    try {
        const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchresults}&appid=${process.env.WEATHERAPI_KEY}`);
        if(!results.ok){
            return res.json({message:'city not found'});
        }
        const data = await results.json();

        return res.status(200).json({data})
        
    } catch (error) {
        return res.status(401).json({message:'failed to get movie try again later'})
        
    }
})
module.exports = router;
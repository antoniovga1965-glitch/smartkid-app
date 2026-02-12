require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwtverify = require('../middleware');



router.post('/movie',jwtverify,async(req,res)=>{
    const {movieEl} = req.body;
    try {
        const results = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${movieEl}`);
        const data = await results.json();

        return res.status(200).json({data})
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:'failed to get weather try again later'})
        
    }
})
module.exports = router;
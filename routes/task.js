const express = require('express');
const jwtverify = require('../middleware');
const router = express.Router();
const {Pool} = require('pg');


const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'my_app',
    password:process.env.POSTGRES_KEY,
    port:5432,
});


router.post('/addtaskfunction',jwtverify,async(req,res)=>{
    const {taskEl} = req.body;

    try {
        const savenote = await pool.query('INSERT INTO tasks (taskel) VALUES ($1)',[taskEl]);
        return res.status(201).json({message:taskEl});
        
    } catch (error) {
        console.error(error)
         return res.status(500).json({message:'failed to save task try again'});
    }

})
module.exports = router;
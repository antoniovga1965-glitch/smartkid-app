require('dotenv').config();
const express= require('express');
const router = express.Router();
const z = require('zod');
const limitor = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const {Pool} =require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'my_app',
    password:'postgres123',
    port:5432,
})


const usernameregex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;

const ageregex = /^(0?[1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/;
const passwordregex = /^.{6,20}$/;

router.post('/registration',async(req,res)=>{
    const {regusername,regage,regpassword} =req.body;
    if(!usernameregex.test(regusername) || !ageregex.test(regage) || ! passwordregex.test(regpassword)){
        return res.status(422).json({message:'validation failed...try again with correct details'});
    }
    const saltrounds = 12;
    const hashedpassword = await bcrypt.hash(regpassword,saltrounds);

    try {
    const reguser = await pool.query('INSERT INTO smartkidusers(regusername,regage,regpassword)VALUES($1,$2,$3)',[regusername,regage,hashedpassword]);
        return res.status(201).json({message:`${regusername} registered succesfully`});
        
    } catch (error) {
console.error(error)
        return res.status(401).json({message:`Something went wrong try again..`});
    }

})

module.exports =router;
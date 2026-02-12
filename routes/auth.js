require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparse = require('cookie-parser');
const limit = require('express-rate-limit');
const z = require('zod');
const {Pool} = require('pg');


const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'my_app',
    password:process.env.POSTGRES_KEY,
    
    port:5432,
});


const limitor = limit({
    windowMs:30*60*1000,
    max:30,
    message:{message:'Too many attempts try again later'},
});

const loginshemas = z.object({
    username:z.string().min(1,'username is required'),
    password:z.string().min(1,'password is required'),
});

const loginmiddleware = (req,res,next)=>{
    const results = loginshemas.safeParse(req.body);
    try {
      if(!results.success){
        return res.status(422).json({message:'incorrect login credentials try again later'});
    }
    next();
    } catch (error) {
        if(error instanceof z.ZodError){
            return res.status(401).json({message:error.errors[0].message})
        }
           return res.status(401).json({message:'check your login credentials and try again'});
    }
}



router.post('/login',limitor,loginmiddleware,async(req,res)=>{
    const {username,password} =req.body;
    try {
        const finduser = await pool.query('SELECT * FROM  smartkidusers WHERE regusername=$1',[username]);
        if(finduser.rowCount===0){
            return res.status(401).json({message:'incorrect login credentials'});
        }

        const match = await bcrypt.compare(password,finduser.rows[0].regpassword);
        if(!match){
            return res.status(422).json({message:'incorrect password'})
        }

        const token = jwt.sign({username},process.env.SECRET_KEY,{expiresIn:'1h'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
        });

        return res.status(200).json({message:`${username} welcome honourable`});
    } catch (error) {
        return res.status(401).json({message:`Try again later with correct login credentials`});
    }
})
module.exports =router;
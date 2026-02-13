require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyjwt = (req,res,next)=>{
    const token =req.cookies.token;
    if(!token){
        return res.status(401).json({message:'no token found'})
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        console.log(decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
         return res.status(500).json({message:'invalid token'});
    }
}

module.exports = verifyjwt;

 const jwt = require('jsonwebtoken')
require("dotenv") .config({path:__dirname+'/./../../.env'})

module.exports = function(req,res,next){
    const token = req.header("jwt_token");
    const emptoken = req.header("emp_token");
    if(!token && !emptoken){
        return res.status(403).json({msg:"authorization denied"});
    }
    try{
        if(token){
            const verify = jwt.verify(token,process.env.jwtSecret);
        req.user = verify.user;
        req.isEmployee = false;
        }
        if(emptoken){
            const verify = jwt.verify(emptoken,process.env.jwtSecret);
        req.emp = verify.emp;
        req.isEmployee = true;
        }
        
        next();
    }catch(error){
        res.status(401).json({msg:"invalid token"});
        console.log(error)
    }
};
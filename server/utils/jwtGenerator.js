const jwt = require('jsonwebtoken')
require ("dotenv").config({path:__dirname+'/../.env'})

function jwtGenerator(user){
    const {user_id, firstName, lastName, email} = user
    const payload ={
        user:{
            id : user_id,
            userName : firstName + " " + lastName,
            email :email            
        }
        
    }
    return jwt.sign(payload,process.env.jwtSecret, {expiresIn:"1h"})
}
function EmpjwtGenerator(emp){
const {eid,email} = emp;
const payload = {
    emp:{
        id:eid,
        email:email
    }
}
return jwt.sign(payload,process.env.jwtSecret,{expiresIn:"1h"})
}
module.exports = {
    jwtGenerator,
    EmpjwtGenerator
};
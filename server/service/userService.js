const userDao   = require('../dao/userDao')
const empDao = require('../dao/empDao')
const {jwtGenerator} = require('../utils/jwtGenerator')
const {EmpjwtGenerator} = require('../utils/jwtGenerator')
    const bcrypt = require('bcryptjs')

class userService {
    async register(user){
        const{fname, lname, email, password} = user;
        

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password,salt);

        const existedUser = await userDao.getByEmail(email);

        if(existedUser){
            return{message:"User Already Exist"}
        }

        let newUser = await userDao.addUser(fname, lname, email, bcryptPassword)
        const jwtToken  = jwtGenerator(newUser);
        return {jwtToken}
    }


    async login(user){
        const {email, password} = user;
         const getUser = await userDao.getByEmail(email);

         if(!getUser) {
            return {message: "User not found"}
         }
         const validPassword = await bcrypt.compare(
            password,
            getUser.password
         )

         if(!validPassword){
            return {message: "invalid password"}
         }

         const jwtToken = jwtGenerator(getUser);

         return{ jwtToken }
    }

    async empLogin(emp){
        const {email, password} = emp;
        console.log("emp1>>",password)
        const getEmp = await empDao.getEmail(email);
        console.log("getEmp>>",getEmp)
        if(!getEmp) {
            return {message: "Employee not found"};
           
         }

         if(getEmp.password === password){
            console.log("success")
            const jwtToken = EmpjwtGenerator(getEmp);
            return{ jwtToken }
          
         }
        
         else{
            return {message: "invalid password"}
         }
         
    }
}module.exports = new userService()
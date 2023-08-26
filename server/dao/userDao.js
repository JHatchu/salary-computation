const pool = require('../db')


class userDao{
    async addUser(fname,lname,email,password){
        console.log("u5===>",fname,lname,email,password)
        try{
          const user =  await pool.query("INSERT INTO user_master(fname,lname,email,password) VALUES ($1,$2,$3,$4) RETURNING * ",
            [fname,lname,email,password])
            console.log("u6===>",fname,lname,email,password)
            return user.rows[0]
        }catch(error){
            console.log("ue3====>",error)
        }
    }

    async getByEmail(email){
        try{
           const user = await pool.query("SELECT * FROM user_master WHERE email=$1",[ email])
            return user.rows[0]

        } catch(error){
          console.log(error)
        }
    }
}
module.exports = new userDao()
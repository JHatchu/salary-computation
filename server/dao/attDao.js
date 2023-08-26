const pool = require('../db');

class AttDao{

   
    async add(emp_id ,month, present, absent, user_id){
      console.log("attt1....",emp_id ,month, present, absent, user_id)
 try{
    const newAtt = await pool.query('INSERT INTO attendance_master(emp_id ,month, present, absent, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [emp_id ,month, present, absent, user_id]);
    console.log(emp_id ,month, present, absent, user_id)
    return newAtt.rows[0];
 }catch(error){
    console.log("err3....",error)
 }
    }
}
module.exports = new AttDao();
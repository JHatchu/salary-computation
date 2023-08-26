const pool = require('../db')
class empDao{

async getAll(id){
    try{
        const allEmp = await pool.query("SELECT * FROM employee_master WHERE eid = $1",[id]);
        return allEmp.rows
    }catch(error){
        console.log(error)
    }

}
async getbyUserid(id){
    try{
        const emp = await pool.query("SELECT * FROM employee_master WHERE user_id = $1",[id])  
        return emp.rows
    }catch(error){
        console.log(error)
    }
}



async getAllEmployees(id){
    try{
        const result = await pool.query("SELECT emp_id, email, CONCAT(fname,'',lname) As employeename FROM employee_master WHERE user_id = $1",[id]);
        console.log("data1===>",result.rows)
        return result.rows;
    }catch(error){
        console.log(error)
    }
}
async getAllEmployeesSal(id,month){
    try{
        const result = await pool.query("SELECT e.emp_id,  CONCAT(e.fname,'',e.lname) As employeename, a.present, a.absent FROM employee_master AS e JOIN attendance_master AS a ON e.emp_id = a.emp_id  WHERE e.user_id = $1 AND a.month = $2;",[id,month]);
        console.log("empSaldata1===>",result.rows)
        return result.rows;
    }catch(error){
        console.log(error)
    }
}
async add(
 
    
   emp_id ,
    fname ,
    lname ,
    gender ,
    dob ,
    resaddress1 ,
    resaddress2 ,
    respincode ,
    rescity ,
    resstate ,
    rescountry ,
    offphone ,
    homephone ,
    mobile1 ,
    mobile2 ,
    email,
    department,
    officeaddress ,
    branch ,
    offcity ,
    offstate ,
    offpincode ,
    offcountry,
    user_id
){
    console.log( "5 emp===>",emp_id,fname ,lname ,gender,dob,resaddress1 ,resaddress2 ,respincode ,rescity ,resstate ,rescountry ,offphone ,homephone ,mobile1 ,mobile2 , email, department, officeaddress ,branch ,offcity , offstate , offpincode ,offcountry,user_id)
    try{
        const newEmp = await pool.query(
            "INSERT INTO employee_master(emp_id,fname ,lname ,gender,dob,resaddress1 ,resaddress2 ,respincode ,rescity ,resstate ,rescountry ,offphone ,homephone ,mobile1 ,mobile2 , email, department, officeaddress ,branch ,offcity , offstate , offpincode ,offcountry, user_id ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING *",
            [emp_id,fname ,lname ,gender,dob,resaddress1 ,resaddress2 ,respincode ,rescity ,resstate ,rescountry ,offphone ,homephone ,mobile1 ,mobile2 , email, department, officeaddress ,branch ,offcity , offstate , offpincode ,offcountry, user_id ]
            )
           console.log( "6 emp===>",emp_id,fname ,lname ,gender,dob,resaddress1 ,resaddress2 ,respincode ,rescity ,resstate ,rescountry ,offphone ,homephone ,mobile1 ,mobile2 , email, department, officeaddress ,branch ,offcity , offstate , offpincode ,offcountry, user_id)
            return newEmp.rows[0]
    }catch(error){
        console.log("3 error==>",error)
    }

}


 async search(query,user_id){
    console.log("query4====>",query,user_id)
    try {
        const result = await pool.query('SELECT * FROM employee_master WHERE emp_id  LIKE $1 AND user_id=$2 ', [`%${query}%`, user_id] );
        console.log("searchresult====>",result.rows)
        return result.rows
 }catch(error){
    console.log(error)
 }


 }
 async  getAllEmpIds(id) {
    console.log("id dao===>",id)
    try {
      const result = await pool.query('SELECT emp_id FROM employee_master WHERE user_id = $1',[id]);
      console.log("data==>",result.rows)
      return result.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async  getEmail(email) {
    console.log("email lg dao1===>",email)
    try {
      const result = await pool.query('SELECT * FROM employee_master WHERE email = $1',[email]);
      console.log("data==>",result.rows)
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }






 async deleteEmp(Eid){
    try{

        const result = await pool.query("DELETE FROM employee_master WHERE emp_id = $1",[Eid])
        console.log("delete5===>",id)
        result.json("deleted")
    }catch(error){
        console.log("delete error===>",error)
    }

 }
}
module.exports = new empDao()
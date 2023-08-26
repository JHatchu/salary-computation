const empDao = require('../dao/empDao');

class empService {
    async getAll(id){
        console.log("eid>>1",id)
   try{
    console.log("eid>>2",id)
      return await empDao.getAll(id)
       }catch(error){
    console.log(error)
    }
     }
async getbyUserid(id){
    console.log("id1:",id)
    try{
        console.log("id2:",id)
        return await empDao.getbyUserid(id)
    }catch(error){
        console.log("user id error===>",error)
    }
}

     async  getAllEmpIds(id) {
        try {
          const result = await empDao.getAllEmpIds(id);
          console.log("data2==>")
          return result.map((emp) => emp.emp_id);
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      
   async getAllEmployees(id){
    try{
        const result = await empDao.getAllEmployees(id);
        console.log("data2===>",result)
        return result
       
    }catch(error){
        console.log(error)
        throw error;
    }
   }
   async getAllEmployeesSal(id,month){
    try{
        const result = await empDao.getAllEmployeesSal(id,month);
        console.log("data2===>",result)
        return result
       
    }catch(error){
        console.log(error)
        throw error;
    }
   }
    async deleteEmp(Eid){
        console.log("delete3===>",Eid)
        try{
            console.log("delete4===>",Eid)
            return await empDao.deleteEmp(Eid)
        }catch(error){
            connsole.log(error)
        }
    }
     async add(emp){
       console.log( "3 emp===>",emp)
       const {emp_id,fname ,lname ,gender,dob,resaddress1 ,resaddress2 ,respincode ,rescity ,resstate ,rescountry ,offphone ,homephone ,mobile1 ,mobile2 , email, department, officeaddress ,branch ,offcity , offstate , offpincode ,offcountry,user_id} = emp;
        try{
         console.log("4 emp===>",emp)
            return await empDao.add(emp_id,fname ,lname ,gender,dob,resaddress1 ,resaddress2 ,respincode ,rescity ,resstate ,rescountry ,offphone ,homephone ,mobile1 ,mobile2 , email, department, officeaddress ,branch ,offcity , offstate , offpincode ,offcountry,user_id)
        }catch(error){
            console.log("2 error===>",error)
        }
     }
   

   
  async search(query, user_id){
    try{
        console.log("query3====>",query,user_id)
        return await empDao.search(query, user_id)
    }catch(error){
        console.log("s2===>",error)
    }
  }
  async getByEmpId(empId){
    try{
        return await empDao.getByEmpId(empId)
    }catch(error){
        console.log(error)
    }
  }


}
module.exports = new empService()
const salDao = require('../dao/salDao')

class salService{

    async addSalary(sal){
        const {emp_id,basicsalary,grade,hra,ca,pa,fa,hi, pf,professionaltax,grossSalary, netSalary, user_id} = sal;
        try{
            return await salDao.addsalary(emp_id,basicsalary,grade,hra,ca,pa,fa,hi, pf,professionaltax,grossSalary, netSalary, user_id)
        }catch(error){
            console.log(error)
        }
     }


async search(query,user_id){
    try{
        console.log("query3====>",query,user_id)
        return await salDao.search(query,user_id)
    }catch(error){
        console.log("s2===>",error)
    }
  }


  async delete(salary_id){
    console.log("delete2===>",salary_id)
    try{
        console.log("delete3===>",salary_id)
        return await salDao.delete(salary_id)
    }catch(error){
        console.log("del error 2 ",error)
    }
  }
} 
module.exports = new salService()
const AttDao = require('../dao/attDao');

class AttService{

    async add(att){
     
        try{
            const { emp_id, month, present, absent, user_id } = att;
            console.log("att32",att.emp_id)
         
            console.log("attt2.....",emp_id,month,present,absent,user_id)
          return await AttDao.add(emp_id,month,present,absent,user_id);
          

        }catch(error){
            console.log("err2.......",error)
        }

    }
}
module.exports = new AttService();
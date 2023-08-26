const pool = require('../db');

class salDao{
    async addsalary ( emp_id,basicsalary,grade,hra,ca,pa,fa,hi, pf,professionaltax,grossSalary, netSalary, user_id){
            try{
                 const newSalary = await pool.query(
                 "INSERT INTO salary_master ( emp_id,basicsalary,grade,hra,ca,pa,fa,hi, pf,professionaltax,grossSalary, netSalary, user_id) VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, $13) RETURNING *",[emp_id,basicsalary,grade,hra,ca,pa,fa,hi, pf,professionaltax,grossSalary, netSalary,user_id]);
               return newSalary.rows[0]
                
            }catch(error){
                console.log(error)
            }
        }
        async search(query,user_id){
            console.log("query4====>",query)
            try {
                const result = await pool.query('SELECT * FROM salary_master WHERE emp_id ILIKE $1 AND user_id = $2', [`%${query}%`, user_id]);
                console.log("searchresult====>",result.rows)
                return result.rows
         }catch(error){
            console.log(error)
         }
}

   async delete(salary_id){
    console.log("del 4==>",salary_id)
    try{
        const result = await pool.query('DELETE FROM salary_master WHERE emp_id = $1',[salary_id])
          resizeBy.json(deleted)

    }catch(error){
        console.log("del error3==>",error)
    }
   }
 }
module.exports = new salDao()
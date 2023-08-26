const pool = require('../db');

class SalaryProcess{
    
    async getSalaryData(id){
      console.log("idsal>>",id)
      try{
         const query = await pool.query("SELECT e.emp_id, s.grosssalary, s.netsalary, s.grade, s.hra, s.pf, s.professionaltax, s.ca, s.pa, s.fa, s.hi  FROM employee_master AS e JOIN salary_master AS s ON e.emp_id = s.emp_id WHERE e.eid = $1 ",[id]);
         console.log("salary gettin",query.rows[0]);
         return query.rows[0]
      }catch{
        console.log(error)
      }
    }


    async getSummary(id){
      try{
        const query = await pool.query("SELECT e.emp_id, d.month, d.onedaysalary, d.salary, s.present, s.absent FROM employee_master AS e JOIN salary_details AS d ON e.emp_id = d.emp_id JOIN Attendance_master AS s ON d.month = s.month AND s.emp_id=e.emp_id WHERE e.emp_id=$1;",[id]);
        const summary = [];
        for(const row of query.rows){
          console.log("sumary gettin",row);
          summary.push(row);
          }
        // console.log("sumary gettin",query.rows[0]);
        return summary;

    
      }catch(error){
        console.log(error)
      }
    }






    async getData(month,user_id,emp_id){
        console.log("month2>>>",month,user_id,emp_id)
        try{
      const query = await pool.query("SELECT e.emp_id, s.netsalary, a.present, a.month FROM employee_master as e JOIN salary_master as s ON e.emp_id=s.emp_id   JOIN attendance_master AS a ON s.emp_id = a.emp_id WHERE a.month = $1 AND e.user_id = $2 AND e.emp_id = $3" ,
      [month, user_id, emp_id]);
      console.log("month3>>>",month,user_id, emp_id)
      console.log("rows==>",query.rows);

      for(const row of query.rows){
          const emp_id = row.emp_id;
          const month = row.month;
         const present = row.present;
         const netsalary = row.netsalary;
         const onedaysalary = netsalary/30;
         const salary = onedaysalary*present;
         await this.add(emp_id,onedaysalary,salary,month);
        }
         
     


     
        }catch(error){
            console.log(error)
        }
    }   
   
     async add(emp_id,onedaysalary,salary,month)   {
        console.log(emp_id,onedaysalary,salary,month)
        try{
          const newSal = await pool.query("INSERT INTO salary_details(emp_id,onedaysalary,salary,month) VALUES ($1,$2,$3,$4) RETURNING *",[emp_id,onedaysalary,salary,month]);
            console.log("rows===>",newSal.rows)
            if (newSal.rows.length > 0) {
                console.log("newsal",newSal.rows[0]);
                return newSal.rows[0];
              } else {
                console.log("No rows returned.");
                return null;
              }
        }catch(error){
            console.log(error)
        }
     }
}
module.exports = new SalaryProcess();


const SalaryProcess = require('../dao/processDao');

class ProcessService{
async getSalaryData(empId){
   try{
    const result =  await SalaryProcess.getSalaryData(empId)
    console.log("res sal>>",result);
    return result;
     
   }catch(error){
    console.log(error)
   }
}
async getSummary(empId){
   try{
      const result =  await SalaryProcess.getSummary(empId)
    console.log("res summ>>",empId);
    return result;
   }
   
     
   catch(error){
    console.log(error)
   }
}


}
module.exports = new ProcessService()
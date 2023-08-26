const router = require('express').Router();
//const authorize = require('../middleware/autorize');
const ProcessService = require('../service/process');

router.get('/g/:eid', async (req,res)=> {
    const empId = req.params;
    console.log("eid for sal",empId);
    
    
try{
  const result = await ProcessService.getSalaryData(empId.eid)
  res.json(result)
}catch(error){
    console.log("error getsal route>>",error)
}
   
    
})
router.get('/s/:eid', async (req,res)=> {
  const empId = req.params;
  console.log("eid for summ",empId);
  
  
try{
const result = await ProcessService.getSummary(empId.eid)
res.json(result)
}catch(error){
  console.log("error getsumm route>>",error)
}
 
  
})
module.exports = router;


const router = require('express').Router();
const authorize = require('../middleware/autorize');
const empService = require('../service/empService');

router.get("/a/:eid", async(req,res)=> {
    const {eid} = req.params;
    console.log("eid>>",eid)
    try{
        const result = await empService.getAll(eid)
        res.json(result)
    }
    catch(error){
        console.log(error)
    }
})
router.get("/a/user/:user_id",async(req,res) => {
    const {user_id} = req.params;
    try{
        const result = await empService.getbyUserid(user_id);
        console.log("userid==>",user_id)
        res.json(result)
    }catch(error){
        console.log(error)
    }
})
router.get("/user/:user_id",async(req,res) => {
    const {user_id} = req.params;
    try{
        const empIds = await empService.getAllEmpIds(user_id);
        console.log('empIds==>',empIds,user_id)
        res.json(empIds)
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
router.get("/employees/user/:user_id",async(req,res) => {
    const {user_id} = req.params;
   

    try{
        const employees = await empService.getAllEmployees(user_id);
        console.log("data3==>",employees,user_id)
        res.json(employees);
    }catch(error){
        console.log(error);
    }
})
router.get("/pocesssal/user/:user_id",async(req,res) => {
    const {user_id} = req.params;
    const {month} = req.query;
    console.log("nnn",month)
    console.log("nnn")
    try{
        const employees = await empService.getAllEmployeesSal(user_id,month);
        console.log("data3==>",employees,user_id)
        res.json(employees);
    }catch(error){
        console.log(error);
    }
})
router.delete("/delete/:id",async(req, res) => {
    
    const {id} = req.params;
    console.log("delete1===>",id)
    try{
        const result = await empService.deleteEmp(id)
        console.log("delete2===>",id)
        res.json("deleted")
    }catch(error){
        console.log(error)
    }
})
router.get("/search",async(req,res) => {
    const query = req.query.query
    const user_id = req.query.user_id
    console.log("1 search query with user====>",query, user_id)
    try{
        const result = await empService.search(query, user_id);
        console.log("2 query with user====>",query, user_id)
        res.json(result)
    }catch(error){
        console.log(error)
    }
})
router.post("/add",authorize, async(req,res) => {
    const emp = req.body;
    emp.user_id = req.user.id
    console.log("1 emp===>",emp)
    try{
        const result = await empService.add(emp)
        console.log("2 emp===>",emp)
        res.json(result)
    }
    catch(error){
        console.log("1 error===>",error)
    }

 
})
module.exports = router;
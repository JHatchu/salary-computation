const authorize = require('../middleware/autorize');
const router = require('express').Router()
const salService = require('../service/salService')

router.post("/addsal",authorize,async(req,res) => {
    const sal = req.body
     sal.user_id = req.user.id
    console.log("addsal1===>",sal)
    try{
        const result = await salService.addSalary(sal)
        res.json(result)
    }catch(error){
        console.log(error)
    }
})
router.get("/search", async(req,res) => {
    const query = req.query.query
    const user_id = req.query.user_id
    console.log("1 query====>",query,user_id)
    try{
        const result = await salService.search(query,user_id)
        console.log("2 query====>",query,user_id)
        res.json(result)
    }catch(error){
        console.log(error)
    }
})
router.delete("/delete/:id",async(req,res) => {
    const {id} = req.params
    console.log("del1==>",id)
    try{
        const result = await salService.delete(id)
    }catch(error){
        console.log("del err 1====>",error)
    }
}) 
module.exports = router;
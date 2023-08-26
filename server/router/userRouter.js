const router = require('express').Router()
const userService = require('../service/userService')

router.post("/register",async(req,res) => {
    try{
        const result = await userService.register(req.body)
        res.json(result)
    }catch(error){
        console.log(error)
    }
})
router.post("/login", async(req,res) => {
    try{
        const result = await userService.login(req.body)
        res.json(result)
    }catch(error){
        console.log(error)
    }
})
router.post("/emplogin",async(req,res) => {
    try{
        const result = await userService.empLogin(req.body)
        res.json(result)
        if (result.success) {
            const empToken = EmpjwtGenerator(result.employee); // Generate the employee token
            res.json({ success: true, empToken: empToken }); // Return the employee token in the response
          } else {
            res.json({ success: false, message: result.message });
          }
    }catch(error){
        console.log(error)
    }
})
module.exports = router
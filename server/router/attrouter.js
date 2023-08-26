const router = require('express').Router();
const AttService = require('../service/attService');
const authorize = require('../middleware/autorize');
router.post("/add",authorize,async(req,res)=> {
   const att = req.body;
   att.user_id = req.user.id;
    try{
      console.log("att1>>>",att);
      const result = await AttService.add(att);

        res.json(result);
    }
    catch(error){
        console.log("err1...",error)
    }
})
module.exports = router;
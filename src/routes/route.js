const express= require("express");
const router= express.Router();
const customerController= require("../controllers/customerController")
const cardController= require("../controllers/cardController")

//======Customer routes=============
router.post("/customer",customerController.createCustomer)
router.get("/customer",customerController.getCustomer)
router.delete("/customer/:customerId",customerController.deleteCustomer)

//==========Card routes =========
router.post("/card",cardController.createCard)
router.get("/card",cardController.getCardDetails)



router.all("/*" ,function(req,res){
return res.status(404).send({msg:"Invalid http request"})
})


module.exports= router
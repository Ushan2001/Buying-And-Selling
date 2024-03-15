const express = require("express")
const Complain = require("../module/complain");


const router = express.Router();

//save Complain

router.post("/complain/save", (req, res) =>{
  let newComplain = new Complain(req.body);

  newComplain.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    return res.status(200).json({
      success:"Complain Save Successfully"
    })
  })
})

//get details

router.get("/complains", (req, res) =>{
    Complain.find().exec((err, complains) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingComplain:complains
      })
    })
})


 //delete complain

router.delete("/complain/delete/:id", (req, res) =>{
   Complain.findByIdAndRemove(req.params.id).exec((err, deleteComplain) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deleteComplain
      })
    })
  })

  //get a specific customer

router.get("/customer/:id",(req, res) =>{
    let customerId = req.params.id;
  
    Customer.findById(customerId,(err, customer) =>{
      if(err){
        return res.status(400).json({success:fails, err})
      }
  
      return res.status(200).json({
        success:true,
        customer
      })
    })
  })
  
  module.exports = router
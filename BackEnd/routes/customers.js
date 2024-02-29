const express = require("express")
const Customer = require("../module/customer");

const router = express.Router();

//save customer

router.post("/customer/save", (req, res) =>{
  let newCustomer = new Customer(req.body);

  newCustomer.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    return res.status(200).json({
      success:"Customer Save Successfully"
    })
  })
})

//get details

router.get("/customers", (req, res) =>{
    Customer.find().exec((err, customers) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingCustomer:customers
      })
    })
})

//update

router.put("/customer/update/:id", (req, res) =>{
    Customer.findByIdAndUpdate(
     req.params.id,
     {
       $set:req.body
     },
     (err, customer) =>{
       if(err){
         return res.status(400).json({error:err})
       }
 
       return res.status(200).json({
         success:"update successfully"
       })
     }
    )
 })

 //delete

router.delete("/customer/delete/:id", (req, res) =>{
    Customer.findByIdAndRemove(req.params.id).exec((err, deleteCustomer) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deleteCustomer
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
 

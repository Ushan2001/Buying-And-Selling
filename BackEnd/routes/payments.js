const express = require("express")
const Payment = require("../module/payment");

const router = express.Router();

//save payment

router.post("/payment/save", (req, res) =>{
    let newPayment = new Payment(req.body);
  
    newPayment.save((err) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      return res.status(200).json({
        success:"Payment Save Successfully"
      })
    })
  })

  //get details

router.get("/payments", (req, res) =>{
    Payment.find().exec((err, payments) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingPayment:payments
      })
    })
})

//update

router.put("/payment/update/:id", (req, res) =>{
    Payment.findByIdAndUpdate(
     req.params.id,
     {
       $set:req.body
     },
     (err, payment) =>{
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

router.delete("/payment/delete/:id", (req, res) =>{
    Payment.findByIdAndRemove(req.params.id).exec((err, deletePayment) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deletePayment
      })
    })
  })

  //get a specific payment

router.get("/payment/:id",(req, res) =>{
    let paymentId = req.params.id;
  
    Payment.findById(paymentId,(err, payment) =>{
      if(err){
        return res.status(400).json({success:fails, err})
      }
  
      return res.status(200).json({
        success:true,
        payment
      })
    })
  })
  
  module.exports = router


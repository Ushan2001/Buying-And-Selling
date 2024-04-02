const express = require("express")
const OldSupplier = require("../module/OldSupplier");
const router = express.Router();


//save order

router.post("/old/supplier/save", (req, res) =>{
    let oldSupplier = new OldSupplier(req.body);
  
    oldSupplier.save((err) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      return res.status(200).json({
        success:"OldSupplier Save Successfully"
      })
    })
  })

  //get details

router.get("/old/supplier", (req, res) =>{
    OldSupplier.find().exec((err, Oldsuppliers) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingOldSupplier:Oldsuppliers
      })
    })
})

//update

router.put("/old/supplier/update/:id", (req, res) =>{
    OldSupplier.findByIdAndUpdate(
     req.params.id,
     {
       $set:req.body
     },
     (err, Oldsupplier) =>{
       if(err){
         return res.status(400).json({error:err})
       }
 
       return res.status(200).json({
         success:"update succesfully"
       })
     }
    )
 })
 
 //delete
 
 router.delete("/old/supplier/delete/:id", (req, res) =>{
   OldSupplier.findByIdAndRemove(req.params.id).exec((err, deleteOldSupplier) =>{
     if(err) return res.status(400).json({
       message:"Delete Unsuccessfull", err
     })
 
     return res.json({
       message:"Delete Susccessfull" , deleteOldSupplier
     })
   })
 })
 
 //get a specific supplier
 
 router.get("/old/supplier/:id",(req, res) =>{
   let oldSupplierId = req.params.id;
 
   OldSupplier.findById(oldSupplierId,(err, Oldsupplier) =>{
     if(err){
       return res.status(400).json({success:fails, err})
     }
 
     return res.status(200).json({
       success:true,
       Oldsupplier
     })
   })
 })
 
 module.exports = router
  
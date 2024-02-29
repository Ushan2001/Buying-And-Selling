const express = require("express")
const Supplier = require("../module/supplier");


const router = express.Router();

//save supplier

router.post("/supplier/save", (req, res) =>{
  let newSupplier = new Supplier(req.body);

  newSupplier.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    return res.status(200).json({
      success:"Supplier Save Successfully"
    })
  })
})

//get details

router.get("/supplier", (req, res) =>{
    Supplier.find().exec((err, suppliers) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingSupplier:suppliers
      })
    })
})

//update

router.put("/supplier/update/:id", (req, res) =>{
   Supplier.findByIdAndUpdate(
    req.params.id,
    {
      $set:req.body
    },
    (err, supplier) =>{
      if(err){
        return res.status(400).json({error:err})
      }

      return res.status(200).json({
        success:"update succedfully"
      })
    }
   )
})

//delete

router.delete("/supplier/delete/:id", (req, res) =>{
  Supplier.findByIdAndRemove(req.params.id).exec((err, deleteSupplier) =>{
    if(err) return res.status(400).json({
      message:"Delete Unsuccessfull", err
    })

    return res.json({
      message:"Delete Susccessfull" , deleteSupplier
    })
  })
})

//get a specific supplier

router.get("/supplier/:id",(req, res) =>{
  let supplierId = req.params.id;

  Supplier.findById(supplierId,(err, supplier) =>{
    if(err){
      return res.status(400).json({success:fails, err})
    }

    return res.status(200).json({
      success:true,
      supplier
    })
  })
})

module.exports = router
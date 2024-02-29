const express = require("express")
const Discount = require("../module/discount");


const router = express.Router();

//save discount

router.post("/discount/save", (req, res) =>{
  let newDiscount = new Discount(req.body);

  newDiscount.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    return res.status(200).json({
      success:"Discount Add Successfully"
    })
  })
})

//get details

router.get("/discounts", (req, res) =>{
    Discount.find().exec((err, discounts) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingDiscount:discounts
      })
    })
})

//update

router.put("/discount/update/:id", (req, res) =>{
   Discount.findByIdAndUpdate(
    req.params.id,
    {
      $set:req.body
    },
    (err, discount) =>{
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

router.delete("/discount/delete/:id", (req, res) =>{
  Discount.findByIdAndRemove(req.params.id).exec((err, deleteDiscount) =>{
    if(err) return res.status(400).json({
      message:"Delete Unsuccessfull", err
    })

    return res.json({
      message:"Delete Susccessfull" , deleteDiscount
    })
  })
})

//get a specific discount

router.get("/discount/:id",(req, res) =>{
  let discountId = req.params.id;

  Discount.findById(discountId,(err, discount) =>{
    if(err){
      return res.status(400).json({success:fails, err})
    }

    return res.status(200).json({
      success:true,
      discount
    })
  })
})

module.exports = router
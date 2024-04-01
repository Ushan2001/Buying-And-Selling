const express = require("express")
const Order = require("../module/order");


const router = express.Router();

//save order

router.post("/order/save", (req, res) =>{
  let newOrder = new Order(req.body);

  newOrder.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    return res.status(200).json({
      success:"Order Save Successfully"
    })
  })
})

//get details

router.get("/orders", (req, res) =>{
    Order.find().exec((err, orders) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingOrder:orders
      })
    })
})

//update

router.put("/order/update/:id", (req, res) =>{
   Order.findByIdAndUpdate(
    req.params.id,
    {
      $set:req.body
    },
    (err, order) =>{
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

router.delete("/order/delete/:id", (req, res) =>{
  Order.findByIdAndRemove(req.params.id).exec((err, deleteOrder) =>{
    if(err) return res.status(400).json({
      message:"Delete Unsuccessfull", err
    })

    return res.json({
      message:"Delete Susccessfull" , deleteOrder
    })
  })
})

//get a specific order

router.get("/order/:id",(req, res) =>{
  let orderId = req.params.id;

  Order.findById(orderId,(err, order) =>{
    if(err){
      return res.status(400).json({success:fails, err})
    }

    return res.status(200).json({
      success:true,
      order
    })
  })
})

module.exports = router
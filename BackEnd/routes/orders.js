const express = require("express")
const Order = require("../module/order");


const router = express.Router();

//save order


router.post("/order/save", async (req, res) => {
  try {
    // Check if a order with the same oid already exists
    const existingOrder = await Order.findOne({
      $or: { oid: req.body.oid }
    });

    if (existingOrder) {
      return res.status(400).json({
        error: "Order with the same OID already exists.",
      });
    }

    // Create a new order instance
    const newOrder = new Order(req.body);

    // Save the new order
    await newOrder.save();

    return res.status(200).json({
      success: "Order record saved successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});
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
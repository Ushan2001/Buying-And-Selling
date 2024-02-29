const express = require("express")
const History = require("../module/history");

const router = express.Router();

//save history

router.post("/history/save", (req, res) =>{
    let newHistory = new History (req.body);
  
    newHistory.save((err) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      return res.status(200).json({
        success:"History Save Successfully"
      })
    })
  })

  //get details

router.get("/history", (req, res) =>{
    History.find().exec((err, historys) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingHistory:historys
      })
    })
})

//update

router.put("/history/update/:id", (req, res) =>{
    History.findByIdAndUpdate(
     req.params.id,
     {
       $set:req.body
     },
     (err, history) =>{
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

router.delete("/history/delete/:id", (req, res) =>{
    History.findByIdAndRemove(req.params.id).exec((err, deleteHistory) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deleteHistory
      })
    })
  })

  //get a specific History

router.get("/history/:id",(req, res) =>{
    let historyId = req.params.id;
  
    History.findById(historyId,(err, history) =>{
      if(err){
        return res.status(400).json({success:fails, err})
      }
  
      return res.status(200).json({
        success:true,
        history
      })
    })
  })
  
  module.exports = router
 
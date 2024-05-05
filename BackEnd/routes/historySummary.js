const express = require("express")
const HistorySum = require("../module/historySummary");

const router = express.Router();

//save history

router.post("/history/summary/save", (req, res) =>{
    let newHistory = new HistorySum (req.body);
  
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

router.get("/summary", (req, res) =>{
    HistorySum.find().exec((err, Sumhistorys) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingSumHistory:Sumhistorys
      })
    })
})

//update

router.put("/history/summary/update/:id", (req, res) =>{
    HistorySum.findByIdAndUpdate(
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

router.delete("/history/summary/delete/:id", (req, res) =>{
    HistorySum.findByIdAndRemove(req.params.id).exec((err, deleteHistory) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deleteHistory
      })
    })
  })

  //get a specific History

router.get("/history/summary/:id",(req, res) =>{
    let historyId = req.params.id;
  
    HistorySum.findById(historyId,(err, history) =>{
      if(err){
        return res.status(400).json({success:false, err})
      }
  
      return res.status(200).json({
        success:true,
        history
      })
    })
  })
  
  module.exports = router
 
const express = require("express")
const OldSupplier = require("../module/OldSupplier");
const router = express.Router();
const nodemailer = require('nodemailer');
const { verifyToken } = require("../helpers/auth-middleware");


//save order

router.post("/old/supplier/save", verifyToken, (req, res) =>{
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

router.get("/old/supplier",  (req, res) =>{
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

router.put("/old/supplier/update/:id", verifyToken, (req, res) =>{
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
 
 router.delete("/old/supplier/delete/:id", verifyToken, (req, res) =>{
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

 // POST endpoint for sending emails
router.post('/send-email', (req, res) => {
  const { subject, message } = req.body;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ushanmihiranga2017@gmail.com', // replace with your Gmail address
      pass: 'pdni vfoz kaho irpc', // replace with your Gmail password
    },
  });

  // Email options
  const mailOptions = {
    from: 'ushanmihiranga2017@gmail.com', // replace with your Gmail address
    to: 'it22243362@my.sliit.lk', // replace with your recipient's email address
    subject: subject,
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  });
});

 
 module.exports = router
  
const express = require("express")
const Delivery = require("../module/delivery");
const router = express.Router();


//save Delivery

router.post("/delivery/save",(req, res) =>{
  let newDelivery = new Delivery(req.body);

  newDelivery.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    return res.status(200).json({
      success:"Delivery Save Successfully"
    })
  })
})

//get details

router.get("/deliverys", (req, res) =>{
     Delivery.find().exec((err, deliverys) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingDelivery:deliverys
      })
    })
})

//update

router.put("/delivery/update/:id",(req, res) =>{
    Delivery.findByIdAndUpdate(
     req.params.id,
     {
       $set:req.body
     },
     (err, delivery) =>{
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

router.delete("/delivery/delete/:id", (req, res) =>{
    Delivery.findByIdAndRemove(req.params.id).exec((err, deleteDelivery) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deleteDelivery
      })
    })
  })

  //get a specific delivery

router.get("/delivery/:id",(req, res) =>{
    let deliveryId = req.params.id;
  
    Delivery.findById(deliveryId,(err, delivery) =>{
      if(err){
        return res.status(400).json({success:fails, err})
      }
  
      return res.status(200).json({
        success:true,
       delivery
      })
    })
  })
  

// // POST endpoint for sending emails
// router.post('/send-email/ridmi', (req, res) => {
//   const { subject, message } = req.body;

//   // Create a nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'ridmi.25106@gmail.com', // replace with your Gmail address
//       pass: 'siqn ncwj lzdi yrzx', // replace with your Gmail password
//     },
//   });

//   // Email options
//   const mailOptions = {
//     from: 'ridmi.25106@gmail.com', // replace with your Gmail address
//     to: 'ridmikranasinghe@gmail.com', // replace with your recipient's email address
//     subject: subject,
//     text: message,
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).send('Internal Server Error');
//     }
//     console.log('Email sent: ' + info.response);
//     res.status(200).send('Email sent successfully');
//   });
// });



  module.exports = router
 

const express = require("express")
const Supplier = require("../module/supplier");
const nodemailer = require('nodemailer');
const { verifyToken } = require("../helpers/auth-middleware");


const router = express.Router();

//save supplier

router.post("/supplier/save", verifyToken, async (req, res) => {
  try {
    // Check if a supplier with the same sid or name already exists
    const existingSupplier = await Supplier.findOne({
      $or: [{ sid: req.body.sid }, { name: req.body.name }],
    });

    if (existingSupplier) {
      return res.status(400).json({
        error: "Supplier with the same SID or Name already exists.",
      });
    }

    // Create a new supplier instance
    const newSupplier = new Supplier(req.body);

    // Save the new supplier
    await newSupplier.save();

    return res.status(200).json({
      success: "Supplier saved successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});




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

router.put("/supplier/update/:id", verifyToken, async (req, res) => {
  try {
      const existingSupplier = await Supplier.findOne({ name: req.body.name });
      if (existingSupplier && existingSupplier._id != req.params.id) {
          // If a supplier with the same name exists and it's not the one being updated
          return res.status(400).json({ error: "Supplier with this name already exists." });
      }

      Supplier.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }, // Return the updated document
          (err, supplier) => {
              if (err) {
                  return res.status(400).json({ error: err });
              }
              return res.status(200).json({ success: "Update successful", supplier });
          }
      );
  } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
  }
});


//delete

router.delete("/supplier/delete/:id", verifyToken, (req, res) =>{
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
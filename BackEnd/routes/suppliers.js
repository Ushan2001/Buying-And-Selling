const express = require("express")
const Supplier = require("../module/supplier");
const nodemailer = require('nodemailer');
const { verifyToken } = require("../helpers/auth-middleware");
const PDFDocument = require("pdfkit");
const fs = require("fs");


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




// Route to generate and download monthly supplier report in PDF format
router.get("/supplier/report/:year/:month", async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const suppliers = await Supplier.find({
      date: {
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString()
      }
    });

    if (suppliers.length === 0) {
      return res.status(404).json({ error: "No data found for the specified month." });
    }

    const pdfDoc = new PDFDocument();
    const buffers = [];


     // Add current date
     const currentDate = new Date().toLocaleDateString();
     pdfDoc.font("Helvetica").fontSize(12).moveDown(1).text(`Report Genarate: ${currentDate}`, { align: "right" }).moveDown();

    // Add company address
    pdfDoc.text("BuySell Nexus", { align: "left" });
    pdfDoc.text("Malabe", { align: "left" });
    pdfDoc.text("Colombo", { align: "left" });

    pdfDoc.font("Helvetica-Bold").fontSize(20).text("Monthly Supplier Report", { align: "center" }).moveDown();

   

    // Add table content
    suppliers.forEach((supplier, index) => {
      pdfDoc.font("Helvetica").fontSize(12).text(`Supplier ID: ${supplier.sid}`);
      pdfDoc.font("Helvetica").fontSize(12).text(`Name: ${supplier.name}`);
      pdfDoc.font("Helvetica").fontSize(12).text(`Product: ${supplier.product}`);
      pdfDoc.font("Helvetica").fontSize(12).text(`Amount: ${supplier.amount}`);
      pdfDoc.font("Helvetica").fontSize(12).text(`Quantity: ${supplier.quantity}`);
      pdfDoc.font("Helvetica").fontSize(12).text(`Date: ${supplier.date}`);
      pdfDoc.font("Helvetica").fontSize(12).text(`Note: ${supplier.note}`);
      pdfDoc.font("Helvetica").fontSize(12).text(`Total Amount: ${supplier.totalAmount}`);
      if (index < suppliers.length - 1) pdfDoc.moveDown();
    });

    // Add signature line
    pdfDoc.moveDown(3).text("This report Contains supplier details for BuySell Nexus company (PVT) LTD.", { align: "left" });
    pdfDoc.moveDown(3).text();
    pdfDoc.moveDown(3).text("___________________________", { align: "right" });
    pdfDoc.moveDown(3).text("Signature", { align: "right" });

  

    pdfDoc.on("data", (buffer) => buffers.push(buffer));
    pdfDoc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="supplier_report_${year}_${month}.pdf"`
      });
      res.send(pdfData);
    });

    pdfDoc.end();
  } catch (error) {
    console.error("Error generating supplier report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router
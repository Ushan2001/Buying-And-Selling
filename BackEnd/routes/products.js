const express = require("express")
const Product = require("../module/product");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Save post with image
router.post("/product/save", upload.single("image"), (req, res) => {
  let newProduct = new Product({
    pid: req.body.pid,
    name: req.body.name,
    type: req.body. type,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    date: req.body.date,
    contact: req.body.contact,
    sname: req.body.sname,
    image: req.file.filename,

    
     
  });

  newProduct.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Product saved successfully",
    });
  });
});


//get details

router.get("/products", (req, res) =>{
    Product.find().exec((err, products) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingProduct:products
      })
    })
})

//update

router.put("/product/update/:id", (req, res) =>{
    Product.findByIdAndUpdate(
     req.params.id,
     {
       $set:req.body
     },
     (err, product) =>{
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

router.delete("/product/delete/:id", (req, res) =>{
    Product.findByIdAndRemove(req.params.id).exec((err, deleteProduct) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deleteProduct
      })
    })
  })
  
  //get a specific product

router.get("/product/:id",(req, res) =>{
    let productId = req.params.id;
  
    Product.findById(productId,(err, product) =>{
      if(err){
        return res.status(400).json({success:fails, err})
      }
  
      return res.status(200).json({
        success:true,
        product
      })
    })
  })
  
  module.exports = router
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    
    pid:{
        type: String,
        required: true
    },
    
    name:{
        type: String,
        required: true
    },

    type:{
        
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    price:{
        type: String,
        required: true
    },

    quantity:{
        type: String,
        required: true
    },

    date:{
        
        type: String,
        required: true
    },

    image: {
        type: String, // Assuming you store the image filename
        required: true
    }

});

module.exports = mongoose.model("Products", ProductSchema)
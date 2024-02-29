const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    category:{
        
        type: String,
        required: true
    },

    pdiscount:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required: true
    },

    time:{
        type: String,
        required: true
    },

    note:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Discount", DiscountSchema)
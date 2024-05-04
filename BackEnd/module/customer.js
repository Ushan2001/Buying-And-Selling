const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    number:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    gender:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    ctype:{
        type: String,
        required: true
    },

    note:{
        type: String,
        required: true
    },
    supplierStatus:{
        type:String,
        default:"not register"
    }
});

module.exports = mongoose.model("Customer", CustomerSchema)
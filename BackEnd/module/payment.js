const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    customer:{
        type: String,
        required: true
    },

    PayID:{
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

    pid:{
        type: String,
        required: true
    },

    amount:{
        type: String,
        required: true
    },
    method:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required: true
    },

    

});

module.exports = mongoose.model("Payment", PaymentSchema)
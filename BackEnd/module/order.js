const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    number:{
        type: String,
        required: true
    },

    oid:{
        type: String,
        required: true
    },

    amount:{
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

    address:{
        type: String,
        required: true
    },

    note:{
        type: String,
        required: true
    },

    totalAmount:{
        type: String,
        required: true
    },

    send:{
        type: String,
        required: true
    },
    requestOrderStatus:{
        type:String,
        default:"Not yet"
    }

});

module.exports = mongoose.model("Orders", OrderSchema)



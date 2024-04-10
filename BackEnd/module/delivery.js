const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({

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

    code:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    distance:{
        type: String,
        required: true
    },
    deliveryFee:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },

    note:{
        type: String,
        required: true
    },

    status:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Delivery", DeliverySchema)
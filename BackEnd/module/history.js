const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({

    tid:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required: true
    },

    bname:{
        type: String,
        required: true
    },

    sname:{
        type: String,
        required: true
    },

    pname:{
        
        type: String,
        required: true
    },

    quantity:{
        type: String,
        required: true
    },

    price:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    totalAmount:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("History", HistorySchema)
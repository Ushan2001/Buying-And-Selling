const mongoose = require("mongoose");

const OldSupplierSchema = new mongoose.Schema({

    sid:{
        type: String,
        required: true
    },
    product:{
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

    note:{
        type: String,
        required: true
    },

    totalAmount:{
        type: String,
        required: true
    },
    InventoryStatus:{
        type:String,
        default:"Not yet"
    },
    PaymentStatus:{
        type:String,
        default:"Not yet"
    }
});

module.exports = mongoose.model("OldSupplier", OldSupplierSchema)
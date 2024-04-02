const mongoose = require("mongoose");

const ComplainSchema = new mongoose.Schema({

    fname:{
        type: String,
        required: true
    },

    lname:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    message:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Complain", ComplainSchema)
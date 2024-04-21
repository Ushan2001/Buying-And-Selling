const mongoose = require("mongoose");

const ComplainSchema = new mongoose.Schema({

    name:{
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
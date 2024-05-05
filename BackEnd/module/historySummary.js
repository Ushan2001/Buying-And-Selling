const mongoose = require("mongoose");

const HistorySumSchema = new mongoose.Schema({

    sid:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required: true
    },
    item:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("History-Summary", HistorySumSchema)
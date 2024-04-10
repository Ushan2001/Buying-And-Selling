const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newUserSchema = new Schema({
  username: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
});

module.exports = mongoose.model("NewUser", newUserSchema);
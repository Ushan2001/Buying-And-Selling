// module.js
const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const NewUser = mongoose.model("NewUser", newUserSchema);

module.exports = NewUser;
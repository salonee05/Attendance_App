const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* user model */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  classes: [
    {
      className: String,
      classCode: String,
      attendance: Number,
      totalClasses: Number,
    },
  ],
});


module.exports = mongoose.model("User", userSchema);
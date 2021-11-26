const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* class model */
const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  students: [
    {
      StudentId: String,
      StudentName: String,
      Attendance: Number,
    },
  ],
  totalClasses: Number,
});


module.exports = mongoose.model("Class", classSchema);

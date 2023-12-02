const mongoose = require("mongoose");
const moment = require("moment");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A student must have a first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "A student must have a last name"],
    trim: true,
  },
  dob: {
    type: Date,
    validate: {
      validator: function (value) {
        const parsedDate = moment(value, "MM/DD/YYYY", true);
        return parsedDate.isValid();
      },
      message: (props) =>
        `${props.value} is not a valid MM/DD/YYYY format`,
    },
    required: true,
  },
  class: {
    type: Number,
    required: [true, "A student must have a Class section"],
    min: 1,
    max: 10,
  },
  marks: {
    type: Number,
    required: [true, "A student must have a total marks"],
    min: 0,
    max: 500,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

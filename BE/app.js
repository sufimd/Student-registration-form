const express = require("express");
const cors = require("cors");
const Student = require("./Modal/UserModel");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/students/all", async (req, res) => {
  try {
    const tours = await Student.find();
    res.status(200).json({
      status: "Success",
      data: tours,
    });
  } catch (err) {
    catchBlockMessage(err, res);
  }
});

app.post("/student/create", async (req, res) => {
  try {
    const studentPayload = req.body;
    const tours = await Student.create(studentPayload);
    res.status(201).json({
      status: "Success",
      data: tours,
    });
  } catch (err) {
    catchBlockMessage(err, res);
  }
});

app.patch("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const studentPayload = req.body;
    const student = await Student.findByIdAndUpdate(id, studentPayload, {
      new: true,
    });
    validateId(student, res, "Please enter valid student id");
    res.status(200).json({
      status: "Success",
      data: student,
    });
  } catch (err) {
    catchBlockMessage(err, res);
  }
});
app.delete("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    validateId(id, res, "Please enter valid student id");
    await Student.findByIdAndDelete(id);

    res.status(200).json({
      status: "Success",
      data: `Successfully deleted the ${id}`,
    });
  } catch (err) {
    catchBlockMessage(err, res);
  }
});

const catchBlockMessage = (err, res) => {
  res.status(400).json({
    status: "Error",
    message: err.message,
  });
};
const validateId = (data, res, message) => {
  if (!data) {
    res.status(400).json({
      status: "Error",
      message: message,
    });
  }
};

module.exports = app;

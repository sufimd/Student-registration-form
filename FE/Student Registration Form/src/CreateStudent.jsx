/* eslint-disable no-unused-vars */
import { useState } from "react";
import moment from "moment";
import StudentDetailGrid from "./StudentDetails";
// import { trusted } from "mongoose";

function CreateStudent() {
  const defaultState = {
    firstName: "",
    lastName: "",
    class: "",
    marks: "",
    dob: "",
  };
  const defaultStateForError = {
    firstName: false,
    lastName: false,
    class: false,
    marks: false,
    dob: false,
  };
  const [isAllFieldsValidated, setisAllFieldsValidated] = useState(false);

  const [studentDetails, setStudentDetails] = useState(defaultState);
  const [studentDetailsErrorMsg, setStudentDetailsErrorMsg] =
    useState(defaultStateForError);

  const createOrupdateStudentDetails = async () => {
    try {
      let apiUrl = `http://localhost:3000/student`;
      const config = {
        method: "",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDetails),
      };
      studentDetails.dob = moment(studentDetails.dob).format("MM/DD/YYYY");
      if (!studentDetails._id) {
        apiUrl += "/create";
        config.method = "POST";
      }
      if (studentDetails._id) {
        config.method = "PATCH";
        apiUrl += `/${studentDetails._id}`;
      }
      const response = await fetch(apiUrl, {
        ...config,
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(studentDetails);

    const fields = validateFields();
    const errorFieldVal = Object.values(fields);
    if (errorFieldVal.includes(true)) {
      setisAllFieldsValidated(false);
      return;
    }
    await createOrupdateStudentDetails();
    setisAllFieldsValidated(true);
  };
  const validateFields = () => {
    const fields = {
      firstName: false,
      lastName: false,
      class: false,
      marks: false,
      dob: false,
    };
    if (!studentDetails.firstName) fields.firstName = true;
    if (!studentDetails.lastName) fields.lastName = true;
    if (
      isNaN(studentDetails.class) ||
      !studentDetails.class ||
      !Number(studentDetails.class) < 0 ||
      !Number(studentDetails.class) > 10
    )
      fields.class = true;
    if (
      isNaN(studentDetails.marks) ||
      !studentDetails.marks ||
      !Number(studentDetails.marks) < 0 ||
      !Number(studentDetails.marks) > 500
    )
      fields.marks = true;
    if (!studentDetails.dob) fields.dob = true;

    // const parsedDate = moment(studentDetails.dob, "MM/DD/YYYY", true);
    // if (!parsedDate.isValid()) fields.dob = true;
    setStudentDetailsErrorMsg(fields);
    return fields;
  };
  const handleOnchangeField = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.name]: e.target.value,
    });
    setStudentDetailsErrorMsg({
      ...studentDetailsErrorMsg,
      [e.target.name]: false,
    });
  };
  const rennderErrorMsg = (field) => {
    return <p style={{ color: "red" }}>Please enter valid {field}</p>;
  };
  const switchComponent = (flag = "") => {
    if (flag !== "EDIT") {
      setStudentDetails(defaultState);
    }
    setisAllFieldsValidated(!isAllFieldsValidated);
  };
  const bindstudentDetails = (data) => {
    data.dob = moment(data.dob).format("YYYY-MM-DD");
    setStudentDetails(data);
  };
  return (
    <div>
      {!isAllFieldsValidated ? (
        <form id="studentForm">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required=""
            value={studentDetails.firstName}
            onChange={handleOnchangeField}
          />
          {studentDetailsErrorMsg.firstName
            ? rennderErrorMsg("First Name")
            : null}

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required=""
            value={studentDetails.lastName}
            onChange={handleOnchangeField}
          />

          {studentDetailsErrorMsg.lastName
            ? rennderErrorMsg("Last Name")
            : null}
          <label htmlFor="classSection">Class:</label>
          <input
            type="text"
            id="classSection"
            name="class"
            required=""
            value={studentDetails.class}
            onChange={handleOnchangeField}
          />
          {studentDetailsErrorMsg.class
            ? rennderErrorMsg("Class Number")
            : null}

          <label htmlFor="marks">Marks:</label>
          <input
            type="text"
            id="marks"
            name="marks"
            required=""
            value={studentDetails.marks}
            onChange={handleOnchangeField}
          />
          {studentDetailsErrorMsg.marks ? rennderErrorMsg("Total Marks") : null}

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="MM/DD/YYYY"
            value={studentDetails.dob}
            onChange={handleOnchangeField}
            required=""
          />
          {studentDetailsErrorMsg.dob ? rennderErrorMsg("Date of birth") : null}

          <button type="button" onClick={onSubmitHandler}>
            {studentDetails?._id ? "Update" : "Create"}
          </button>
          <button className="buttonSwitch" onClick={switchComponent}>
            Go to student details
          </button>
        </form>
      ) : (
        <StudentDetailGrid
          switchComponent={switchComponent}
          bindstudentDetails={bindstudentDetails}
        />
      )}
    </div>
  );
}

export default CreateStudent;

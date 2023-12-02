/* eslint-disable  */
import { useEffect, useState } from "react";
import moment from "moment";

function StudentDetailGrid({ switchComponent, bindstudentDetails }) {
  const [studentDeatails, setStudentDetails] = useState([]);
  useEffect(() => {
    const pageLoad = async () => {
      try {
        const apiUrl = "http://localhost:3000/students/all";
        const response = await fetch(apiUrl);
        const data = await response.json();
        setStudentDetails(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    pageLoad();
  }, []);
  const editBtnHandler = (data) => {
    bindstudentDetails(data);
    switchComponent('EDIT');
  };
  const deleteStudentDetail = async (studentDetails) => {
    try {
      const apiUrl = `http://localhost:3000/student/${studentDetails._id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status == "Success") {
        const filteredData = studentDeatails.filter(
          (el) => el._id != studentDetails._id
        );
        setStudentDetails(filteredData);
      }
      console.log("DELETE", data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={switchComponent}>Back</button>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Class</th>
            <th>Marks</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentDeatails.map((el) => {
            return (
              <tr key={el._id}>
                <td>{el.firstName}</td>
                <td>{el.lastName}</td>
                <td>{el.class}</td>
                <td>{el.marks}</td>
                <td>{moment(el.dob).format("MM/DD/YYYY")}</td>
                <td className="actions">
                  <button onClick={() => editBtnHandler(el)}>Edit</button>
                  <button onClick={() => deleteStudentDetail(el)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDetailGrid;

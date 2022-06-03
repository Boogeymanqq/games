import { useEffect, useState } from "react";
import { NavigationTeacher } from "../navigationTeacher";

export const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const url = "/api/auth/students";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      const dataArr = data.map((elem) => ({
        ...elem,
        isChecked: false,
      }));
      console.log(dataArr);
      setStudents(dataArr);
    }
    getStudents();
  }, []);

  function selectedStudent(id) {
    setGroup(
      students.map((elem) => {
        if (elem._id === id) {
          elem.isChecked = !elem.isChecked;
        }
        return elem;
      })
    );
  }

  console.log("group", group);

  const filtredgroup = group
    .filter((elem) => elem.isChecked === true)
    .map((elem) => ({ _id: elem._id }));

  console.log("new group", filtredgroup);

  function createGroup() {
    async function postGroup() {
      const url = "http://localhost:5000/api/groups";
      const response = await fetch(url, {
        method: "POST",
        body: filtredgroup,
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      console.log("data", data);
    }
    postGroup();
  }

  return (
    <>
      <NavigationTeacher />
      <div
        style={{
          marginLeft: "200px",
          fontSize: "20px",
        }}
      >
        <h2>Список учеников:</h2>
        <ul style={{ listStyle: "auto" }}>
          {students.map((student, index) => (
            <li key={index}>
              {student.lastName} {student.firstName}
              <input
                type="checkbox"
                onChange={() => selectedStudent(student._id)}
              />
            </li>
          ))}
        </ul>
        <button onClick={createGroup}>создать группу</button>
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import { NavigationTeacher } from "../navigationTeacher";

export const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [group, setGroup] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [nameGropup, setNameGroup] = useState("");
  const [trackAnswer, setTrackAnswer] = useState();

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
      setStudents(dataArr);
    }
    getStudents();
    async function getGroup() {
      const url = "http://localhost:3000/api/groups";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      console.log(data.groups);
      setListGroup(data.groups);
    }
    getGroup();
  }, [null, trackAnswer]);

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

  // console.log("group", group);

  const filtredgroup = group
    .filter((elem) => elem.isChecked === true)
    .map((elem) => elem._id);
  // console.log(filtredgroup);

  const createSelectGroup = [
    {
      name: nameGropup,
      students: filtredgroup,
    },
  ];

  // console.log(createSelectGroup);

  function createGroup() {
    async function postGroup() {
      const url = "http://localhost:3000/api/groups";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(createSelectGroup),
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setNameGroup("");
      const data = await response.json();
      setTrackAnswer(data);
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
        <input
          type="text"
          value={nameGropup}
          onChange={(e) => setNameGroup(e.target.value)}
        />
        <button onClick={createGroup}>создать группу</button>
        <h2>Список групп:</h2>
        <ul style={{ listStyle: "auto" }}>
          {listGroup.map((group, index) =>
            group.students.length > 0 ? (
              <li key={index}>
                {group.groupName} :{" "}
                {group.students.map((elem, index) => (
                  <span key={index}>{elem}; </span>
                ))}
              </li>
            ) : null
          )}
        </ul>
      </div>
    </>
  );
};

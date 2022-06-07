import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button/button";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { teacherStudentsNav } from "../../data";
import s from "./teacher-students.module.css";

export const Teacherstudents = ({ caption }) => {
  const [students, setStudents] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [nameGropup, setNameGroup] = useState("");
  const [trackAnswer, setTrackAnswer] = useState();
  const [checked, setChecked] = useState();

  useEffect(() => {
    async function getStudents() {
      const url = "http://localhost:3000/api/auth/students";
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
      setChecked();
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
    setStudents(
      students.map((elem) => {
        if (elem._id === id) {
          elem.isChecked = !elem.isChecked;
        }
        return elem;
      })
    );
  }

  const filtredgroup = students
    .filter((elem) => elem.isChecked === true)
    .map((elem) => elem._id);
  // console.log(filtredgroup, students);

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
      setChecked("");
      console.log("data", data);
    }
    postGroup();
  }

  function deleteGroup(id) {
    const obj = [{ _id: id }];
    async function deleteApi() {
      const url = "http://localhost:3000/api/groups";
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setTrackAnswer(data);
      console.log("data", data);
    }
    deleteApi();
  }
  return (
    <>
      <header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </header>
      <nav className={s.nav}>
        {teacherStudentsNav.map((elem, index) => (
          <Link to={elem.route} key={index}>
            <Button type={elem.type}>{elem.title}</Button>
          </Link>
        ))}
      </nav>
      <main className={s.main}>
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
                  checked={checked}
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
            {listGroup.map((group, index) => (
              <div key={index}>
                <li>
                  {group.groupName} :{" "}
                  {group.students.map((elem, index) => (
                    <span key={index}>{elem}; </span>
                  ))}
                </li>
                <button onClick={() => deleteGroup(group._id)}>&times;</button>
              </div>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

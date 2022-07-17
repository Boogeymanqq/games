import React, { useEffect, useState } from "react";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Navigationstudents } from "../../components/navigation-students/navigation-students";
import { Main } from "../../layouts/main";
import { Panel } from "../../ui/panel/panel";
import { Panelstudents } from "../../ui/panel/panel-students/panel-students";
import { Button } from "../../ui/button/button";
import s from "./teacher-students.module.css";

export const Teacherstudents = ({ caption, students, setStudents }) => {
  // const [students, setStudents] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const [trackAnswer, setTrackAnswer] = useState("");
  const [buttons, setButtons] = useState(true);

  // console.log("students", students);

  // console.log(checked);

  useEffect(() => {
    // async function getStudents() {
    //   const url = "http://localhost:3000/api/auth/students";
    //   const response = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.token}`,
    //     },
    //   });
    //   const data = await response.json();
    //   setStudents(data.map((elem) => ({ ...elem, isChecked: false })));
    //   const check = document.querySelectorAll('input[type="checkbox"]');
    //   check.forEach((elem) => (elem.checked = false));
    // }
    // getStudents();
    // const check = document.querySelectorAll('input[type="checkbox"]');
    // check.forEach((elem) => (elem.checked = false));

    async function getGroup() {
      const url = "http://localhost:3000/api/groups";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      setListGroup(data.$res);
    }
    getGroup();
  }, [trackAnswer]);

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

  const createSelectGroup = [
    {
      name: nameGroup,
      students: filtredgroup,
    },
  ];

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
    }
    deleteApi();
  }

  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </Header>
      {/* <Navigationstudents /> */}
      <Main className={s.main}>
        <div className={s.buttons}>
          <button
            onClick={() => setButtons(false)}
            className={s.btn}
            style={
              buttons
                ? { background: "#000", color: "#B5FF9A" }
                : { background: "#B5FF9A", color: "#000" }
            }
          >
            Ученики
          </button>
          <button
            onClick={() => setButtons(true)}
            className={s.btn}
            style={
              buttons
                ? { background: "#A7DFFF", color: "#000" }
                : { background: "#000", color: "#A7DFFF" }
            }
          >
            Группы
          </button>
        </div>
        {buttons ? (
          <div className={s.groups__table}></div>
        ) : (
          <div className={s.students__table}></div>
        )}

        {/* <div className={s.panels}>
          <Panel caption="Список студентов" background="#A7DFFF">
            {students?.map((elem, index) => (
              <Panelstudents
                key={index}
                {...elem}
                number={`${index + 1}.`}
                onChange={() => selectedStudent(elem._id)}
              />
            ))}
          </Panel>
          <Panel caption="Список групп" background="#B5FF9A">
            <ul style={{ listStyle: "auto" }}>
              {listGroup.map((group, index) => (
                <div key={index}>
                  <li>
                    {group.groups.groupName}:{"  "}
                    {group.studentsInGroups.map((elem, index) => (
                      <span key={index}>
                        {elem.firstName}
                        {"  "}
                        {elem.lastName},{"  "}
                      </span>
                    ))}
                  </li>
                  <button onClick={() => deleteGroup(group.groups._id)}>
                    &times;
                  </button>
                </div>
              ))}
            </ul>
            <div className={s.group__name}>
              <input
                type="text"
                placeholder="Введите название группы"
                value={nameGroup}
                onChange={(e) => setNameGroup(e.target.value.trim())}
              />
              <div onClick={createGroup}>
                <Button
                  type="submit"
                  disabled={!nameGroup || filtredgroup.length === 0}
                >
                  OK
                </Button>
              </div>
            </div>
          </Panel>
        </div> */}
      </Main>
    </>
  );
};

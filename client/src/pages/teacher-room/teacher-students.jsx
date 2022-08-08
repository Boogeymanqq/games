import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, setStudents } from "../../redux/slices/studentsSlice";
import { Box, CircularProgress } from "@mui/material";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Main } from "../../layouts/main";
import { Navigationstudents } from "../../components/navigation-students/navigation-students";
import { HOST } from "../../data";
import deleteStudent from "./img/icon-delete.svg";
import editStudent from "./img/icon-edit.svg";
import addStudent from "./img/icon-add.svg";
import student from "./img/icon-user.svg";
import s from "./teacher-students.module.css";

export const Teacherstudents = ({ caption }) => {
  const [listGroup, setListGroup] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const [trackAnswer, setTrackAnswer] = useState("");
  const [buttons, setButtons] = useState(0);

  const { students, status } = useSelector((state) => state.studentsSlice);
  const dispatch = useDispatch();

  // console.log("students", students);

  // console.log(checked);

  useEffect(() => {
    dispatch(fetchStudents());

    const check = document.querySelectorAll('input[type="checkbox"]');
    check.forEach((elem) => (elem.checked = false));

    async function getGroup() {
      const url = `${HOST}/api/groups`;
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
  }, []);

  function selectedStudent(id) {
    // setStudents(
    students.map((elem) => {
      if (elem._id === id) {
        elem.isChecked = !elem.isChecked;
      }
      return elem;
    });
    // );
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
      const url = `${HOST}/api/groups`;
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
      const url = `${HOST}/api/groups`;
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

  function removeStudent(id) {
    const deletedStudent = { studentId: id };
    console.log("deletedStudent", deletedStudent);
    async function deleteStudentApi() {
      const url = `${HOST}/api/auth/delete/student`;
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(deletedStudent),
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setTrackAnswer(data);
    }
    deleteStudentApi();
  }

  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </Header>
      <Navigationstudents />
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
        {!buttons ? (
          <div className={s.students__table}>
            {status === "error" ? (
              <p
                style={{
                  fontSize: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                Ошибка, повторите позже
              </p>
            ) : status === "loading" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "592px",
                  width: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>имя</th>
                    <th>фамилия</th>
                    <th>логин</th>
                    <th>пароль</th>
                    <th>комментарий</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((elem, index) => (
                    <tr key={elem._id}>
                      <td>{index + 1}</td>
                      <td>{elem.firstName}</td>
                      <td>{elem.lastName}</td>
                      <td>{elem.login}</td>
                      <td>
                        <span>{elem.openPas ?? "---"}</span>
                      </td>
                      <td>{elem.comment ?? ""}</td>
                      <td>
                        <div className={s.action_icons}>
                          <div
                            className={s.delete}
                            title="Удалить"
                            onClick={() => removeStudent(elem._id)}
                          >
                            <img src={deleteStudent} alt="" />
                          </div>
                          <div className={s.edit} title="Редактировать">
                            <img
                              src={editStudent}
                              alt=""
                              width="24"
                              height="24"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className={s.groups__table}>
            <table>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Big</td>
                  <td>
                    <div className={s.action_icons}>
                      <div className={s.add}>
                        <img src={addStudent} alt="" />
                      </div>
                      <div className={s.delete}>
                        <img src={deleteStudent} alt="" />
                      </div>
                      <div className={s.edit}>
                        <img src={student} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Little</td>
                  <td>
                    <div className={s.action_icons}>
                      <div className={s.add}>
                        <img src={addStudent} alt="" />
                      </div>
                      <div className={s.delete}>
                        <img src={deleteStudent} alt="" />
                      </div>
                      <div className={s.edit}>
                        <img src={student} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Goldy</td>
                  <td>
                    <div className={s.action_icons}>
                      <div className={s.add}>
                        <img src={addStudent} alt="" />
                      </div>
                      <div className={s.delete}>
                        <img src={deleteStudent} alt="" />
                      </div>
                      <div className={s.edit}>
                        <img src={student} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

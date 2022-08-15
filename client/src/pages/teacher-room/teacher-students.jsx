import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  fetchRemoveStudent,
  removeStudent,
  editStudent,
} from "../../redux/slices/studentsSlice";
import { Box, CircularProgress } from "@mui/material";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Main } from "../../layouts/main";
import { Navigationstudents } from "../../components/navigation-students/navigation-students";
import { Table } from "../../ui/table/Table";
import { TableHeader } from "../../ui/table/TableHeader";
import { TableRow } from "../../ui/table/TableRow";
import { tableHeader } from "./teacherData";
import removeIcon from "./img/icon-delete.svg";
import editIcon from "./img/icon-edit.svg";
import addIcon from "./img/icon-add.svg";
import studentIcon from "./img/icon-user.svg";
import s from "./teacher-students.module.css";

export const Teacherstudents = ({ caption }) => {
  const { students, status } = useSelector((state) => state.studentsSlice);
  const dispatch = useDispatch();
  console.log("students", students);

  // const [listGroup, setListGroup] = useState([]);
  // const [nameGroup, setNameGroup] = useState("");
  // const [trackAnswer, setTrackAnswer] = useState("");
  const [buttons, setButtons] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());

    // const check = document.querySelectorAll('input[type="checkbox"]');
    // check.forEach((elem) => (elem.checked = false));

    // async function getGroup() {
    //   const url = `${HOST}/api/groups`;
    //   const response = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.token}`,
    //     },
    //   });
    //   const data = await response.json();
    //   setListGroup(data.$res);
    // }
    // getGroup();
  }, []);

  const deleteStudent = (id) => {
    dispatch(removeStudent({ id }));
    dispatch(fetchRemoveStudent(id));
  };

  const toggleEditStudent = (id) => {
    dispatch(editStudent({ id }));
  };

  // function selectedStudent(id) {
  // setStudents(
  //   students.map((elem) => {
  //     if (elem._id === id) {
  //       elem.isChecked = !elem.isChecked;
  //     }
  //     return elem;
  //   });
  // );
  // }

  // const filtredgroup = students
  //   .filter((elem) => elem.isChecked === true)
  //   .map((elem) => elem._id);

  // const createSelectGroup = [
  //   {
  //     name: nameGroup,
  //     students: filtredgroup,
  //   },
  // ];

  // function createGroup() {
  //   async function postGroup() {
  //     const url = `${HOST}/api/groups`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify(createSelectGroup),
  //       headers: {
  //         Authorization: `Bearer ${localStorage.token}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });
  //     setNameGroup("");
  //     const data = await response.json();
  //     setTrackAnswer(data);
  //   }
  //   postGroup();
  // }

  // function deleteGroup(id) {
  //   const obj = [{ _id: id }];
  //   async function deleteApi() {
  //     const url = `${HOST}/api/groups`;
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //       body: JSON.stringify(obj),
  //       headers: {
  //         Authorization: `Bearer ${localStorage.token}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     setTrackAnswer(data);
  //   }
  //   deleteApi();
  // }

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
                ? {
                    background: "#000",
                    color: "#B5FF9A",
                  }
                : {
                    background: "#B5FF9A",
                    color: "#000",
                  }
            }
          >
            <p>Ученики</p>
            <Link
              to="/teacherroom/sign"
              style={{ display: "block", marginLeft: "20px" }}
            >
              <img src={addIcon} alt="" />
            </Link>
          </button>
          <button
            onClick={() => setButtons(true)}
            className={s.btn}
            style={
              buttons
                ? {
                    background: "#A7DFFF",
                    color: "#000",
                  }
                : {
                    background: "#000",
                    color: "#A7DFFF",
                  }
            }
          >
            <p>Группы</p>
            <Link to="#" style={{ display: "block", marginLeft: "20px" }}>
              <img src={addIcon} alt="" />
            </Link>
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
              <Table className={s.table}>
                <TableHeader className={s.thead}>
                  <TableRow>
                    {tableHeader.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </TableRow>
                </TableHeader>
                <tbody>
                  {students?.length === 0 ? (
                    <TableRow>
                      <td colSpan={7}>Ни один ученик еще не зарегистрирован</td>
                    </TableRow>
                  ) : (
                    students?.map((student, index) => (
                      <TableRow key={student._id}>
                        <td>{index + 1}</td>
                        <td>
                          {!student.isChecked ? (
                            student.firstName
                          ) : (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                setValue("");
                              }}
                            >
                              <input
                                size="4"
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                              />
                            </form>
                          )}
                        </td>
                        <td>
                          {!student.isChecked ? (
                            student.lastName
                          ) : (
                            <input
                              size="4"
                              type="text"
                              value={student.lastName}
                            />
                          )}
                        </td>
                        <td>
                          {!student.isChecked ? (
                            student.login
                          ) : (
                            <input size="4" type="text" value={student.login} />
                          )}
                        </td>
                        <td>
                          <span>
                            {!student.isChecked ? (
                              student.openPas ? (
                                student.openPas
                              ) : (
                                "---"
                              )
                            ) : (
                              <input
                                size="4"
                                type="text"
                                value={student.openPas}
                              />
                            )}
                          </span>
                        </td>
                        <td>
                          {!student.isChecked ? (
                            student.comment ? (
                              student.comment
                            ) : (
                              "---"
                            )
                          ) : (
                            <input
                              size="4"
                              type="text"
                              value={student.comment}
                            />
                          )}
                        </td>
                        <td>
                          <div className={s.action_icons}>
                            <div
                              className={s.delete}
                              title="Удалить"
                              onClick={() => deleteStudent(student._id)}
                            >
                              <img src={removeIcon} alt="" />
                            </div>
                            <div
                              className={s.edit}
                              title="Редактировать"
                              onClick={() => toggleEditStudent(student._id)}
                            >
                              <img
                                src={editIcon}
                                alt=""
                                width="24"
                                height="24"
                              />
                            </div>
                          </div>
                        </td>
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </div>
        ) : (
          <div className={s.groups__table}>
            <Table className={s.table}>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Big</td>
                  <td>
                    <div className={s.action_icons}>
                      <div className={s.add}>
                        <img src={addIcon} alt="" />
                      </div>
                      <div className={s.delete}>
                        <img src={removeIcon} alt="" />
                      </div>
                      <div className={s.edit}>
                        <img src={studentIcon} alt="" />
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
                        <img src={addIcon} alt="" />
                      </div>
                      <div className={s.delete}>
                        <img src={removeIcon} alt="" />
                      </div>
                      <div className={s.edit}>
                        <img src={studentIcon} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Goldy</td>
                  <td>
                    <div className={s.action_icons}>
                      <div className={s.add}>
                        <img src={addIcon} alt="" />
                      </div>
                      <div className={s.delete}>
                        <img src={removeIcon} alt="" />
                      </div>
                      <div className={s.edit}>
                        <img src={studentIcon} alt="" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
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
                  // disabled={!nameGroup || filtredgroup.length === 0}
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

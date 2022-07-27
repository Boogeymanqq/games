import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button/button";
import { navRoom } from "../../data";
import add from "./img/icon-add.png";
import select from "./img/icon-select.png";
import play from "./img/icon-play.png";
import { HOST } from "../../data";
import s from "./navigation-room.module.css";

export const Navigationroom = ({ setLessonStudents, connectGames }) => {
  const [showStudentsList, setShowStudentsList] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const url = `${HOST}/api/auth/students`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      setStudents(data.map((elem) => ({ ...elem, isChecked: false })));
      const check = document.querySelectorAll('input[type="checkbox"]');
      check.forEach((elem) => (elem.checked = false));
    }
    getStudents();
  }, []);

  function chooseStudents(id) {
    setStudents(
      students.map((elem) => {
        if (elem._id === id) {
          elem.isChecked = !elem.isChecked;
        }
        return elem;
      })
    );
    setLessonStudents(
      students.filter((elem) => (elem.isChecked ? elem : null))
    );
  }

  function connect() {
    // console.log("hello");
    connectGames("connect");
    console.log(connectGames);
  }

  return (
    <nav className={s.nav}>
      {navRoom.map((elem, index) =>
        elem.title !== "Урок" ? (
          <Link to={elem.route} key={index}>
            <Button type={elem.type}>{elem.title}</Button>
          </Link>
        ) : (
          <Button
            onClick={() => {
              setShowStudentsList(!showStudentsList);
            }}
            type={elem.type}
            key={index}
          >
            {elem.title}
          </Button>
        )
      )}

      {showStudentsList && (
        <div className={s.students}>
          <Link className={s.students__link} to="/teacherroom/lesson">
            <img
              onClick={() => connect()}
              src={play}
              alt=""
              width="38"
              height="38"
            />
          </Link>
          {students.map((elem) => (
            <label key={elem._id}>
              <img
                src={!elem.isChecked ? add : select}
                alt=""
                width="38"
                height="38"
              />

              {elem.firstName}
              <input
                type="checkbox"
                onChange={(e) => chooseStudents(elem._id)}
              />
            </label>
          ))}
        </div>
      )}
    </nav>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button/button";
import { navRoom } from "../../data";
import add from "./img/icon-add.png";
import select from "./img/icon-select.png";
import play from "./img/icon-play.png";
import s from "./navigation-room.module.css";

export const Navigationroom = ({
  students,
  setStudents,
  setLessonStudents,
}) => {
  const [showStudentsList, setShowStudentsList] = React.useState(false);
  // console.log("showStudentsList", showStudentsList);

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
      {showStudentsList &&
        students.map((elem) => (
          <label key={elem._id}>
            {elem.firstName}
            <input type="checkbox" onChange={(e) => chooseStudents(elem._id)} />
          </label>
        ))}
      <Link to="/teacherroom/lesson">Игра</Link>
    </nav>
  );
};

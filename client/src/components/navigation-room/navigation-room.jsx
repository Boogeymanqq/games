import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, setStudents } from "../../redux/slices/studentsSlice";
import { Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button/button";
import { navRoom } from "../../data";
import add from "./img/icon-add.png";
import select from "./img/icon-select.png";
import play from "./img/icon-play.png";
import s from "./navigation-room.module.css";

export const Navigationroom = ({ connectGames }) => {
  const [showStudentsList, setShowStudentsList] = useState(false);

  const { students, status } = useSelector((state) => state.studentsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  function chooseStudents(id) {
    dispatch(setStudents(id));
  }

  function connect() {
    // console.log("hello");
    connectGames("connect");
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
          {status === "error" ? (
            <p
              style={{
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
                height: "353px",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </nav>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import s from "./student.module.css";

export const Student = ({ text, selectStudents }) => {
  const authUserName = JSON.parse(localStorage.getItem("userName"));
  const navigate = useNavigate();

  console.log(text);

  React.useEffect(() => {
    if (text === "connect") {
      // navigate("/teacherroom/lesson");
      selectStudents.forEach((elem) =>
        elem.firstName.includes(authUserName.split(" ")[0])
          ? navigate("/teacherroom/lesson")
          : null
      );
    }
  }, [text]);

  console.log(selectStudents, authUserName.split(" ")[0]);

  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <p>{authUserName}</p>
      </Header>
      <Main>
        <div className={s.cards}>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
        </div>
      </Main>
    </>
  );
};

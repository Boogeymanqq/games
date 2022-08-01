import React, { useEffect } from "react";
import useSocket from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import s from "./student.module.css";

export const Student = () => {
  const { text, selectStudents } = useSocket();

  const authUserName = JSON.parse(localStorage.getItem("userName"));
  const childrenId = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate();

  // console.log(selectStudents);

  useEffect(() => {
    if (text === "connect") {
      console.log(true);
      selectStudents.forEach((elem) =>
        childrenId.includes(elem._id) ? navigate("/teacherroom/lesson") : null
      );
    }
    return () => {};
  });

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

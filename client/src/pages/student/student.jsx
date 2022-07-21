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
    console.log("###student hoock text",text);
    if (text === "connect") {
      // navigate("/teacherroom/lesson");
      console.log("###select students" ,selectStudents);
      console.log("#authUserName", authUserName);
      selectStudents.forEach((elem) => 
        
      
        authUserName.split(" ")[0].includes(elem.lastName)
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

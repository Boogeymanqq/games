import React from "react";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import s from "./student.module.css";

export const Student = () => {
  const authUserName = JSON.parse(localStorage.getItem("userName"));
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

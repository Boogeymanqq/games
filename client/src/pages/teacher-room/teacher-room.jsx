import React from "react";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Navigationroom } from "../../components/navigation-room/navigation-room";
import s from "./teacher-room.module.css";
import { Panel } from "../../ui/panel/panel";

export const Teacherroom = ({ caption }) => {
  return (
    <>
      <header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </header>
      <Navigationroom />
      <main className={s.main}>
        <div className={s.panels}>
          <Panel />
          <Panel />
        </div>
      </main>
    </>
  );
};

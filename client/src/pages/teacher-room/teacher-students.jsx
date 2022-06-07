import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button/button";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { teacherStudentsNav } from "../../data";
import s from "./teacher-students.module.css";

export const Teacherstudents = ({ caption }) => {
  return (
    <>
      <header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </header>
      <nav className={s.nav}>
        {teacherStudentsNav.map((elem, index) => (
          <Link to={elem.route} key={index}>
            <Button type={elem.type}>{elem.title}</Button>
          </Link>
        ))}
      </nav>
      <main className={s.main}></main>
    </>
  );
};

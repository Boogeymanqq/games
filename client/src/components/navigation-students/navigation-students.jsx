import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button/button";
import { teacherStudentsNav } from "../../data";
import s from "./navigation-students.module.css";

export const Navigationstudents = () => {
  return (
    <nav className={s.nav}>
      {teacherStudentsNav.map((elem, index) => (
        <Link to={elem.route} key={index}>
          <Button type={elem.type}>{elem.title}</Button>
        </Link>
      ))}
    </nav>
  );
};

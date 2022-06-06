import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button/button";
import { navRoom } from "../../data";
import s from "./navigation-room.module.css";

export const Navigationroom = () => {
  return (
    <nav className={s.nav}>
      {navRoom.map((elem, index) => (
        <Link to={elem.route} key={index}>
          <Button type={elem.type}>{elem.title}</Button>
        </Link>
      ))}
    </nav>
  );
};

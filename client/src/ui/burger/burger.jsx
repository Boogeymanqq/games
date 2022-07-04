import React from "react";
import burger from "./icon-burger.svg";
import s from "./burger.module.css";

export const Burger = ({ onClick }) => {
  return (
    <div className={s.burger} onClick={onClick}>
      <img src={burger} alt="burger" />
    </div>
  );
};

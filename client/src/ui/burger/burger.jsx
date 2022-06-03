import React from "react";
import burger from "./icon-burger.svg";
import s from "./burger.module.css";

export const Burger = () => {
  return (
    <div className={s.burger}>
      <img src={burger} alt="burger" />
    </div>
  );
};

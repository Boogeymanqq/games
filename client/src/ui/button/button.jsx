import React from "react";
import s from "./button.module.css";

export const Button = ({ children, type }) => {
  return (
    <>
      <button className={s.btn} type={type}>
        {children}
      </button>
    </>
  );
};

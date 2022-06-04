import React from "react";
import s from "./button.module.css";

export const Button = ({ children }) => {
  return (
    <>
      <button className={s.btn}>{children}</button>
    </>
  );
};

import React from "react";
import s from "./button.module.css";

export const Button = ({ caption }) => {
  return (
    <>
      <button className={s.btn}>{caption}</button>
    </>
  );
};

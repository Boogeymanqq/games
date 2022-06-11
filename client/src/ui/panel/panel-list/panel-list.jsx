import React from "react";
import s from "./panel-list.module.css";

export const Panellist = ({ number, text }) => {
  return (
    <div className={s.list}>
      <p>{number}</p>
      <p>{text}</p>
    </div>
  );
};

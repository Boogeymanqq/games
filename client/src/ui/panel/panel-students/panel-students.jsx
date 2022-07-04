import React from "react";
import s from "./panel-students.module.css";

export const Panelstudents = ({ number, lastName, firstName, onChange }) => {
  return (
    <div className={s.students}>
      <p>{number}</p>
      <p>{lastName}</p>
      <p>{firstName}</p>
      <input type="checkbox" onChange={onChange} />
    </div>
  );
};

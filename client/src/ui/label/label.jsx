import React from "react";
import s from "./label.module.css";

export const Label = ({ picture, alt }) => {
  return (
    <div className={s.label}>
      <div className={s.icon}>
        <img src={picture} alt={alt} />
      </div>
    </div>
  );
};

import React from "react";
import s from "../lesson.module.css";

export const ObjectInFolders = ({ src, onChange }) => {
  return (
    <div className={s.show__items}>
      <img style={{ width: "90px", height: "90px" }} src={src} alt="" />
      <input type="checkbox" onChange={onChange} />
    </div>
  );
};

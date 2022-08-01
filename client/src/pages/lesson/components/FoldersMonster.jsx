import React from "react";
import s from "../lesson.module.css";

export const FoldersMonster = ({ onClick, dir }) => {
  return (
    <div onClick={onClick} className={s.monster__folder}>
      {dir}
    </div>
  );
};

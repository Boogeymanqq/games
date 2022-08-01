import React from "react";
import s from "../lesson.module.css";
import user from "../img/icon-active-user.svg";

export const StudentInGame = ({ firstName }) => {
  return (
    <div className={s.user}>
      <div>
        <img src={user} alt="user" width="18" height="18" />
      </div>
      <p>{firstName}</p>
    </div>
  );
};

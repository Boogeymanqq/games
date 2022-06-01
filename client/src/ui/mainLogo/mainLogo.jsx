import React from "react";
import logo from "./icon-main-logo.svg";
import s from "./mainLogo.module.css";

export const Mainlogo = () => {
  return (
    <div className={s.logo}>
      <img src={logo} alt="small_talk" width="223" height="239" />
    </div>
  );
};

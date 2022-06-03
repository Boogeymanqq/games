import React from "react";
import { Link } from "react-router-dom";
import logo from "./icon-page-logo.svg";
import s from "./pageLogo.module.css";

export const Pagelogo = () => {
  return (
    <div className={s.logo}>
      <Link to="/">
        <img src={logo} alt="small_talk" width="132" height="141" />
      </Link>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { Label } from "../../ui/label/label";
import smile from "./img/icon-smile.svg";
import pen from "./img/icon-pen.svg";
import login from "./img/icon-enter.svg";
import contacts from "./img/icon-contacts.svg";
import s from "./navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={s.nav}>
      <div className={s.items}>
        <Link to="/platform">
          <Label picture={smile} alt="smile" />
          <p>О платформе</p>
        </Link>
      </div>
      <div className={s.items}>
        <Link to="/signin">
          <Label picture={pen} alt="pen" />
          <p>Регистрация</p>
        </Link>
      </div>
      <div className={s.items}>
        <Link to="login">
          <Label picture={login} alt="login" />
          <p>Войти</p>
        </Link>
      </div>
      <div className={s.items}>
        <Link to="/contacts">
          <Label picture={contacts} alt="contacts" />
          <p>Контакты</p>
        </Link>
      </div>
    </nav>
  );
};

import React from "react";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Burger } from "../../ui/burger/burger";
import { Main } from "../../layouts/main";
import scores from "./img/icon-star.svg";
import size from "./img/icon-size.svg";
import help from "./img/icon-help.svg";
import screen from "./img/icon-screen.svg";
import rules from "./img/icon-info.svg";
import change from "./img/icon-change.svg";
import user from "./img/icon-active-user.svg";
import s from "./lesson.module.css";

export const Lesson = ({ caption }) => {
  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
        <Burger />
      </Header>
      <Main className={s.main}>
        <div className={s.playground}>
          <div className={s.users__online}>
            <div className={s.user}>
              <div>
                <img src={user} alt="user" width="18" height="18" />
              </div>
              <p>Маша</p>
            </div>
            <div className={s.user}>
              <div>
                <img src={user} alt="user" width="18" height="18" />
              </div>
              <p>Ваня</p>
            </div>
          </div>
          <div className={s.playfields}>
            <div className={s.frames}>
              <div className={s.frame__top}></div>
              <div className={s.frame__bottom}></div>
            </div>
            <div className={s.subject__toys}></div>
          </div>
          <div className={s.panel__controls}>
            <ul className={s.list}>
              <li>
                <img src={scores} alt="scores" width="18" height="18" />
                <a href="#">Баллы</a>
              </li>
              <li>
                <img src={size} alt="size" width="18" height="18" />
                <a href="#">Размер</a>
              </li>
              <li>
                <img src={help} alt="help" width="18" height="18" />
                <a href="#">Подсказки</a>
              </li>
              <li>
                <img src={screen} alt="screen" width="18" height="18" />
                <a href="#">Экран ученика</a>
              </li>
              <li>
                <img src={rules} alt="rules" width="18" height="18" />
                <a href="#">Как играть</a>
              </li>
              <li>
                <img src={change} alt="change" width="18" height="18" />
                <a href="#">Изменить</a>
              </li>
            </ul>
          </div>
        </div>
      </Main>
    </>
  );
};

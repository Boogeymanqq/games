import React from "react";
import { Headerpage } from "../../components/header-page/header-page";
import { Main } from "../../layouts/main";
import smile from "./img/icon-smile.svg";
import heart from "./img/icon-heart.svg";
import lightning from "./img/icon-lightning.svg";
import star from "./img/icon-star.svg";
import s from "./platform.module.css";

export const Platform = ({ caption }) => {
  return (
    <>
      <Headerpage picture={smile} />
      <Main className={s.main}>
        <h2>{caption}</h2>
        <div className={s.description}>
          <p>
            Small Talk — это сайт для преподавателей, которые считают, что
            онлайн уроки могут быть не менее увлекательными и эффективными, чем
            занятия в классе. <br />
            Теперь не нужно думать, как удержать внимание ученика у экрана —
            инструменты платформы Small Talk включат в урок всех участников с
            самого начала. <br />В игровой форме все темы усваиваются легко и не
            заметно. Подготовка к занятию не требует много времени. Все темы из
            учебника можно легко интегрировать в игру, используя шаблоны и
            готовую базу упражнений.
          </p>
        </div>
        <div className={s.images}>
          <img src={heart} alt="icon" width="120" height="104" />
          <img src={lightning} alt="icon" width="100" height="139" />
          <img src={star} alt="icon" width="96" height="92" />
        </div>
      </Main>
    </>
  );
};

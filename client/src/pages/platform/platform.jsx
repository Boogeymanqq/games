import React from "react";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Label } from "../../ui/label/label";
import smile from "./img/icon-smile.svg";
import s from "./platform.module.css";
import { Burger } from "../../ui/burger/burger";

export const Platform = ({ caption }) => {
  return (
    <>
      <header className={s.header}>
        <Pagelogo />
        <Label picture={smile} />
        <Burger />
      </header>
      <main className={s.main}>
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
      </main>
    </>
  );
};

import React, { useState } from "react";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Button } from "../../ui/button/button";
import {
  buttonsStyleActive,
  buttonStyleNormal,
  buttonSubmitStyle,
} from "./cardData";
import s from "./Card.module.css";

export const Card = ({ caption }) => {
  const [activeBtn, setActiveBtn] = useState([true, false, false, false]);

  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </Header>
      <Main>
        <div className={s.buttons__panel}>
          {activeBtn.map((item, index, arr) => (
            <Button
              style={item ? buttonsStyleActive : buttonStyleNormal}
              key={index}
              onClick={() => {
                if (!arr[index]) {
                  arr.splice(index, 1, !arr[index]);
                }

                setActiveBtn(arr);
                // console.log(activeBtn);
              }}
              // onClick={() => console.log(index)}
            >
              Коллекция
            </Button>
          ))}
        </div>
        <div className={s.cards__field}>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
          <div className={s.card}></div>
        </div>
        <div className={s.button__submit}>
          <Button type="submit" style={buttonSubmitStyle}>
            OK
          </Button>
        </div>
      </Main>
    </>
  );
};

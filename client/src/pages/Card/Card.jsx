import React from "react";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Button } from "../../ui/button/button";
import s from "./Card.module.css";

export const Card = ({ caption }) => {
  const buttonsStyle = {
    margin: 0,
    width: "100%",
  };
  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </Header>
      <Main>
        <div className={s.buttons__panel}>
          <Button style={buttonsStyle}>Коллекция</Button>
          <Button style={buttonsStyle}>Коллекция</Button>
          <Button style={buttonsStyle}>Коллекция</Button>
          <Button style={buttonsStyle}>Коллекция</Button>
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
      </Main>
    </>
  );
};

import React from "react";
import { Header } from "../../layouts/header";
import { Mainlogo } from "../../ui/mainLogo/mainLogo";
import { Title } from "../../ui/title/title";
import s from "./main-header.module.css";

export const Mainheader = () => {
  return (
    <>
      <Header className={s.header}>
        <Mainlogo />
        <Title caption="Учись играя" />
      </Header>
    </>
  );
};

import React from "react";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Label } from "../../ui/label/label";
import { Burger } from "../../ui/burger/burger";
import s from "./header-page.module.css";

export const Headerpage = ({ picture }) => {
  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <Label picture={picture} />
        <Burger />
      </Header>
      ;
    </>
  );
};

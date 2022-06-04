import React from "react";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Label } from "../../ui/label/label";
import { Burger } from "../../ui/burger/burger";
import s from "./header-page.module.css";

export const Headerpage = ({ picture }) => {
  return (
    <>
      <header className={s.header}>
        <Pagelogo />
        <Label picture={picture} />
        <Burger />
      </header>
      ;
    </>
  );
};

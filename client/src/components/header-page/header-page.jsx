import React from "react";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Label } from "../../ui/label/label";
import { Burger } from "../../ui/burger/burger";
import s from "./header-page.module.css";

export const Headerpage = ({ picture }) => {
  const [isLogo, setIsLogo] = React.useState(true);
  const hideLogo = () => {
    return setIsLogo(!isLogo);
  };
  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <Label picture={picture} />
        {isLogo && <Burger onClick={hideLogo} />}
      </Header>
      ;
    </>
  );
};

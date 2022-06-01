import React from "react";
import { Mainlogo } from "../../ui/mainLogo/mainLogo";
import { Title } from "../../ui/title/title";

import s from "./header.module.css";

export const Header = () => {
  return (
    <>
      <header className={s.header}>
        <Mainlogo />
        <Title caption="Учись играя" />
      </header>
    </>
  );
};

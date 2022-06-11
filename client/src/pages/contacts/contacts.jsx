import React from "react";
import { Headerpage } from "../../components/header-page/header-page";
import { Main } from "../../layouts/main";
import contacts from "./img/icon-contacts.svg";
import s from "./contacts.module.css";

export const Contacts = ({ caption }) => {
  return (
    <>
      <Headerpage picture={contacts} />
      <Main className={s.main}>
        <h2>{caption}</h2>
      </Main>
    </>
  );
};

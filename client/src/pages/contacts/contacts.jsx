import React from "react";
import { Headerpage } from "../../components/header-page/header-page";
import contacts from "./img/icon-contacts.svg";
import s from "./contacts.module.css";

export const Contacts = ({ caption }) => {
  return (
    <>
      <Headerpage picture={contacts} />
      <main className={s.main}>
        <h2>{caption}</h2>
      </main>
    </>
  );
};

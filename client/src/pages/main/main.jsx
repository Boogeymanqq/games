import React from "react";
import { Header } from "../../components/header/header";
import { Navigation } from "../../components/navigation/navigation";
import s from "./main.module.css";

export function Main() {
  return (
    <div className={s.main}>
      <Header />
      <Navigation />
    </div>
  );
}

import React from "react";
import { Mainheader } from "../../components/main-header/main-header";
import { Navigation } from "../../components/navigation/navigation";
import s from "./main.module.css";

export function Main() {
  return (
    <>
      <Mainheader />
      <Navigation />
    </>
  );
}

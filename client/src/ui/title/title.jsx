import React from "react";
import s from "./title.module.css";

export const Title = ({ caption }) => {
  return (
    <div className={s.title}>
      <h1>{caption}</h1>
    </div>
  );
};

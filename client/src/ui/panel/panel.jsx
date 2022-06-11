import React from "react";
import s from "./panel.module.css";

export const Panel = ({ background, children, caption }) => {
  return (
    <div className={s.panel} style={{ background: `${background}` }}>
      <h3>{caption}</h3>
      {children}
    </div>
  );
};

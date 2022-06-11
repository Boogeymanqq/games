import React from "react";
import s from "./panel-item.module.css";

export const Panelitem = ({ caption, icon, alt, width, height, children }) => {
  return (
    <div className={s.panel__item}>
      <p>{caption}</p>
      <div className={s.img}>
        <img src={icon} alt={alt} width={width} height={height} />
      </div>
      {children}
    </div>
  );
};

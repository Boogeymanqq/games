import React from "react";
import s from "./panel-info.module.css";

export const Panelinfo = ({
  caption,
  icon,
  alt,
  width,
  height,
  title,
  children,
}) => {
  return (
    <div className={s.panel__info}>
      <div className={s.title}>
        <p>{caption}</p>
        <div className={s.img}>
          <img src={icon} alt={alt} width={width} height={height} />
        </div>
      </div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

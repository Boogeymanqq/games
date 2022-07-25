import React from "react";
import s from "./button.module.css";

export const Button = ({
  children,
  type,
  disabled = false,
  onClick,
  style,
}) => {
  return (
    <>
      <button
        className={s.btn}
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={style}
      >
        {children}
      </button>
    </>
  );
};

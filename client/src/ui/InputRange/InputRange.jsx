import React from "react";
import s from "./InputRange.module.css";

export const InputRange = ({ title, step, min, max, value, onInput }) => {
  return (
    <label className={s.range}>
      <p>{title}</p>
      <input
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onInput={onInput}
      />
    </label>
  );
};

import React from "react";
import s from "./LessonTool.module.css";

export const LessonTool = ({ src, alt, width, height, onClick, caption }) => {
  return (
    <li>
      <img src={src} alt={alt} width={width} height={height} />
      <button onClick={onClick}>{caption}</button>
    </li>
  );
};

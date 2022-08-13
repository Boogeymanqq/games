import React from "react";
import clsx from "clsx";
import s from "./table.module.css";

export const Table = ({ className, children }) => {
  return <table className={clsx(s.table, className)}>{children}</table>;
};

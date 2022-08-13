import React from "react";
import clsx from "clsx";
import s from "./table.module.css";

export const TableRow = ({ className, children }) => {
  return <tr className={clsx(s.tr, className)}>{children}</tr>;
};

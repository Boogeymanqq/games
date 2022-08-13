import React from "react";
import clsx from "clsx";
import s from "./table.module.css";

export const TableHeader = ({ className, children }) => {
  return <thead className={clsx(s.thead, className)}>{children}</thead>;
};

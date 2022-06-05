import React from "react";
import { NavigationTeacher } from "./navigationTeacher";
import { StudentForm } from "./students/studentForm";

export const Teacher = ({ caption }) => {
  return (
    <>
      <NavigationTeacher />
      <StudentForm caption={caption} />
    </>
  );
};

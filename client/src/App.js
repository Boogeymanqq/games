import React, { useState, useEffect } from "react";
import useSocket from "./hooks/useSocket";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Platform } from "./pages/platform/platform";
import { Signin } from "./pages/sign/signin";
import { Login } from "./pages/login/login";
import { Contacts } from "./pages/contacts/contacts";
import { Games } from "./pages/games/games";
import { Card } from "./pages/Card/Card";
import { Room } from "./ui/rooms/rooms";
import { Teacher } from "./pages/teacher/teacher";
import { Student } from "./pages/student/student";
import { StudentList } from "./pages/teacher/students/studentList";
import { Teacherroom } from "./pages/teacher-room/teacher-room";
import { Studentform } from "./pages/student-form/student-form";
import { Teacherstudents } from "./pages/teacher-room/teacher-students";
import { Lesson } from "./pages/lesson/lesson";
import { BackendTest } from "./pages/backendTest/backendTest";
import { useSelector } from "react-redux";

function App() {
  const { connectGames, arrSelectStudents, selectStudents } = useSocket();
  const { students } = useSelector((state) => state.studentsSlice);

  // console.log(selectStudents);
  console.log(students);

  useEffect(() => {
    arrSelectStudents(
      students.filter((elem) => (elem.isChecked ? elem : null))
    );
  }, [students]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/platform" element={<Platform caption="О платформе" />} />
        <Route path="/signin" element={<Signin caption="Регистрация" />} />
        <Route path="/login" element={<Login caption="Войти" />} />
        <Route path="/contacts" element={<Contacts caption="Контакты" />} />
        <Route
          path="/teacherroom"
          element={
            <Teacherroom caption="Личный кабинет" connectGames={connectGames} />
          }
        />
        <Route
          path="/teacherroom/students"
          element={<Teacherstudents caption="Ученики" />}
        />

        <Route
          path="/teacherroom/sign"
          element={<Studentform caption="Регистрация" />}
        />
        <Route
          path="/teacherroom/lesson"
          element={<Lesson caption="Урок 1" selectStudents={selectStudents} />}
        />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher/studentlist" element={<StudentList />} />
        <Route path="/teacher/games" element={<Games />} />
        <Route path="/teacherroom/card" element={<Card caption="Открытка" />} />
        <Route path="/room" element={<Room />} />
        <Route
          path="/teacher"
          element={<Teacher caption="Регистрация ученика" />}
        />
        <Route path="/backtest" element={<BackendTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

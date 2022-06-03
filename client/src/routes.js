import React from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Platform } from "./pages/platform/platform";
import { Signin } from "./pages/sign/signin";
import { Login } from "./pages/login/login";
import { Contacts } from "./pages/contacts/contacts";
import { Games } from "./pages/games/games";
import { Monster } from "./ui/monster/monster";
import { Cards } from "./ui/cards/cards";
import { Room } from "./ui/rooms/rooms";
import { Teacher } from "./pages/teacher/teacher";
import { ChildrenPage } from "./pages/childrenPage/childrenPage";
import { StudentList } from "./pages/teacher/students/studentList";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/platform" element={<Platform caption="О платформе" />} />
      <Route path="/signin" element={<Signin caption="Регистрация" />} />
      <Route path="/login" element={<Login caption="Войти" />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/teacher/games" element={<Games />} />
      <Route path="/monster" element={<Monster />} />
      <Route path="/cards" element={<Cards />} />
      {/* <Route path="/checkroom" element={<CheckRoom />} /> */}
      <Route path="/room" element={<Room />} />
      <Route
        path="/teacher"
        element={<Teacher caption="Регистрация ученика" />}
      />
      <Route path="/teacher/studentlist" element={<StudentList />} />
      <Route path="/childrenpage" element={<ChildrenPage />} />
    </Routes>
  );
};

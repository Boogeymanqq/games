import React from "react";
import useSocket from "./hooks/useSocket";
import { BrowserRouter } from "react-router-dom";
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
import { Teacherroom } from "./pages/teacher-room/teacher-room";
import { Studentform } from "./pages/student-form/student-form";
import { Teacherstudents } from "./pages/teacher-room/teacher-students";
import { Lesson } from "./pages/lesson/lesson";

function App() {
  const { users, messages, log, sendMessage, removeMessage } = useSocket();
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
          element={<Teacherroom caption="Личный кабинет" />}
        />
        <Route
          path="/teacherroom/students"
          element={<Teacherstudents caption="Студенты" />}
        />

        <Route
          path="/teacherroom/sign"
          element={<Studentform caption="Регистрация" />}
        />
        <Route
          path="/teacherroom/lesson"
          element={<Lesson caption="Урок 1" />}
        />
        <Route path="/childrenpage" element={<ChildrenPage />} />
        <Route path="/teacher/studentlist" element={<StudentList />} />
        <Route path="/teacher/games" element={<Games />} />
        <Route
          path="/monster"
          element={
            <Monster
              users={users}
              log={log}
              messages={messages}
              sendMessage={sendMessage}
              removeMessage={removeMessage}
            />
          }
        />
        <Route path="/cards" element={<Cards />} />
        <Route path="/room" element={<Room />} />
        <Route
          path="/teacher"
          element={<Teacher caption="Регистрация ученика" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

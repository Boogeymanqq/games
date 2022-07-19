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
import { Student } from "./pages/student/student";
import { StudentList } from "./pages/teacher/students/studentList";
import { Teacherroom } from "./pages/teacher-room/teacher-room";
import { Studentform } from "./pages/student-form/student-form";
import { Teacherstudents } from "./pages/teacher-room/teacher-students";
import { Lesson } from "./pages/lesson/lesson";

function App() {
  const {
    users,
    messages,
    log,
    sendMessage,
    removeMessage,
    sendSelect,
    connectGames,
    text,
    arrSelectStudents,
    selectStudents,
    monsterSize,
    objSizeMonster,
    monsterBorderSize,
    borderSizeMonster,
  } = useSocket();
  const [students, setStudents] = React.useState([]);
  const [lessonStudents, setLessonStudents] = React.useState([]);

  console.log(text);

  React.useEffect(() => {
    arrSelectStudents(lessonStudents);
  }, [lessonStudents]);

  React.useEffect(() => {
    async function getStudents() {
      const url = "http://localhost:3000/api/auth/students";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      setStudents(data.map((elem) => ({ ...elem, isChecked: false })));
      const check = document.querySelectorAll('input[type="checkbox"]');
      check.forEach((elem) => (elem.checked = false));
    }
    getStudents();
  }, []);

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
            <Teacherroom
              caption="Личный кабинет"
              students={students}
              setStudents={setStudents}
              setLessonStudents={setLessonStudents}
              connectGames={connectGames}
            />
          }
        />
        <Route
          path="/teacherroom/students"
          element={
            <Teacherstudents
              caption="Ученики"
              students={students}
              setStudents={setStudents}
            />
          }
        />

        <Route
          path="/teacherroom/sign"
          element={<Studentform caption="Регистрация" />}
        />
        <Route
          path="/teacherroom/lesson"
          element={
            <Lesson
              caption="Урок 1"
              users={users}
              log={log}
              messages={messages}
              sendMessage={sendMessage}
              removeMessage={removeMessage}
              sendSelect={sendSelect}
              // lessonStudents={lessonStudents}
              selectStudents={selectStudents}
              monsterSize={monsterSize}
              objSizeMonster={objSizeMonster}
              monsterBorderSize={monsterBorderSize}
              borderSizeMonster={borderSizeMonster}
            />
          }
        />
        <Route
          path="/student"
          element={<Student text={text} selectStudents={selectStudents} />}
        />
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
              sendSelect={sendSelect}
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

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  // извлекаем данные пользователя из локального хранилища
  const user = localStorage.getItem("room");
  const login = localStorage.getItem("login");
  // const student = localStorage.getItem("student");
  // локальное состояние для списка пользователей
  const [users, setUsers] = useState([]);
  // локальное состояние для списка сообщений
  const [messages, setMessages] = useState([]);
  // состояние для системного сообщения
  const [log, setLog] = useState(null);
  // иммутабельное состояние для сокета

  const [text, setText] = useState("");
  const [selectStudents, setSelectStudents] = useState([]);
  const [objSizeMonster, setObjSizeMonster] = useState();
  const socket = useRef(null);

  const roomId = JSON.parse(user);
  const userName = JSON.parse(login);
  // регистрируем обработчики
  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      query: {
        roomId,
      },
    });

    // сообщаем о подключении нового пользователя
    socket.current.emit("user:add", { userName });

    // запрашиваем сообщения из БД
    // socket.current.emit("message:get");

    // обрабатываем получение системного сообщения
    socket.current.on("log", (log) => {
      console.log(log);
      setLog(log);
    });

    // обрабатываем получение обновленного списка пользователей
    socket.current.on("user_list:update", (users) => {
      setUsers(users);
      console.log(users);
    });

    // обрабатываем получение обновленного списка сообщений
    socket.current.on("message_list:update", (messages) => {
      // setMessages(JSON.stringify(messages));
      setMessages(messages);
      console.log(messages);
    });

    socket.current.on("text:student", (text) => {
      setText(text);
      console.log(text);
    });

    socket.current.on("update:student", (arr) => {
      setSelectStudents(arr);
      console.log(selectStudents);
    });

    socket.current.on("update:size", (mSize) => {
      setObjSizeMonster(mSize);
      // console.log(setObjSizeMonster);
    });
  }, [roomId]);

  // метод для отправки сообщения (координат)
  const sendMessage = (message) => {
    socket.current.emit("message:add", message);
    console.log(message);
  };

  const sendSelect = (message) => {
    socket.current.emit("message:select", message);
    console.log(message);
  };

  // метод для удаления сообщения (координат)
  const removeMessage = (message) => {
    socket.current.emit("message:remove", message);
  };

  const connectGames = (text) => {
    socket.current.emit("message:connect", text);
  };

  const arrSelectStudents = (arr) => {
    socket.current.emit("message:selectStudents", arr);
  };

  const monsterSize = (mSize) => {
    socket.current.emit("message:size", mSize);
  };

  return {
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
  };
}

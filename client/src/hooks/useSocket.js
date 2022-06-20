import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  // извлекаем данные пользователя из локального хранилища
  const user = localStorage.getItem("room");
  // const student = localStorage.getItem("student");
  // локальное состояние для списка пользователей
  const [users, setUsers] = useState([]);
  // локальное состояние для списка сообщений
  const [messages, setMessages] = useState([]);
  // состояние для системного сообщения
  const [log, setLog] = useState(null);
  // иммутабельное состояние для сокета
  const socket = useRef(null);

  const roomId = JSON.parse(user);
  const userName = JSON.parse(user);

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
    socket.current.emit("message:get");

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
      setMessages(messages);
    });
  }, [roomId]);

  // метод для отправки сообщения (координат)
  const sendMessage = (message) => {
    socket.current.emit("message:add", message);
  };

  // метод для удаления сообщения (координат)
  const removeMessage = (message) => {
    socket.current.emit("message:remove", message);
  };

  return { users, messages, log, sendMessage, removeMessage };
}

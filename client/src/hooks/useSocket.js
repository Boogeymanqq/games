import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  // извлекаем данные пользователя из локального хранилища
  const user = localStorage.getItem("room");
  // локальное состояние для списка пользователей
  const [users, setUsers] = useState([]);
  // локальное состояние для списка сообщений
  const [messages, setMessages] = useState({});
  // состояние для системного сообщения
  const [log, setLog] = useState(null);
  // иммутабельное состояние для сокета
  const { current: socket } = useRef(
    io("http://localhost:5000", {
      query: {
        //отправляем id учителя??
        // отправляем идентификатор комнаты и имя пользователя на сервер
        roomId: JSON.parse(user),
        userName: JSON.parse(user),
      },
    })
  );

  const dirtyObj = {
    roomId: JSON.parse(user),
    userName: JSON.parse(user),
  };

  // регистрируем обработчики
  useEffect(() => {
    // сообщаем о подключении нового пользователя
    socket.emit("user:add", dirtyObj); //id учеников???

    // запрашиваем сообщения из БД
    socket.emit("message:get");

    // обрабатываем получение системного сообщения
    socket.on("log", (log) => {
      console.log(log);
      setLog(log);
    });

    // обрабатываем получение обновленного списка пользователей
    socket.on("user_list:update", (users) => {
      setUsers(users);
      console.log(users);
    });

    // обрабатываем получение обновленного списка сообщений
    socket.on("message_list:update", (messages) => {
      setMessages(messages);
    });
  }, []);

  // метод для отправки сообщения (координат)
  const sendMessage = (message) => {
    socket.emit("message:add", message);
  };

  // метод для удаления сообщения (координат)
  const removeMessage = (message) => {
    socket.emit("message:remove", message);
  };

  return { users, messages, log, sendMessage, removeMessage };
}

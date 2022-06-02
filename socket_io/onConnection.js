import userHandlers from './handlers/user.handlers.js'
import messageHandlers from './handlers/message.handlers.js'
import { SportsCricket } from '@mui/icons-material'

export default function onConnection(io, socket) {
  // извлекаем идентификатор комнаты и имя пользователя
  const { roomId, userName } = socket.handshake.query

  // записываем их в объект сокета
  socket.roomId = roomId
  socket.userName = userName

  // присоединяемся к комнате
  socket.join(roomId)

  // регистрируем обработчики для пользователей
  userHandlers(io, socket)

  // рагистрируем обработчики для сообщений
  messageHandlers(io, socket)
}

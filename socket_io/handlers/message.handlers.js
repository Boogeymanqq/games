import Message from '../../models/message.model.js'
import { removeFile } from '../../utils/file.js'
import onError from '../../utils/onError.js'

// хранилище для сообщений
const messages = {}

export default function messageHandlers(io, socket) {
  // извлекаем идентификатор комнаты
  const { roomId } = socket

  // утилита для обновления списка сообщений
  const updateMessageList = () => {
    io.to(roomId).emit('message_list:update', messages[roomId])
  }

  // обрабатываем получение сообщений
  socket.on('message:get', async () => {
    try {
      // получаем сообщения по id комнаты
      const _messages = await Message.find({
        roomId
      })
      // инициализируем хранилище сообщений
      messages[roomId] = _messages

      // обновляем список сообщений
      updateMessageList()
    } catch (e) {
      onError(e)
    }
  })

  // обрабатываем создание нового сообщения
  socket.on('message:add', (message) => {
    // пользователи не должны ждать записи сообщения в БД
    Message.create(message).catch(onError)

    // для клиента
    message.createAt = Date.now()

    // создаём сообщение
    messages[roomId].push(message)

    // обновляем список сообщений
    updateMessageList()
  })

  // обрабатываем удаление сообщения
  socket.on('message:remove', (message) => {
    const { messageId, messageType, textOrPathToFile } = message

    Message.deleteOne({ messageId })
      .then(() => {
        if (messageType !== 'text') {
          removeFile(textOrPathToFile)
        }
      })
      .catch(onError)

    // удаляем сообщение
    messages[roomId] = messages[roomId].filter((m) => m.messageId !== messageId)

    // обновляем список сообщений
    updateMessageList()
  })
}
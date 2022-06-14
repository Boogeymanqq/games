// основной файл сервера
import cors from 'cors'
import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { createServer } from 'http'
import upload from './utils/upload.js'
import onError from './utils/onError.js'
import { getFilePath } from './utils/file.js'
import authRouter from './routes/auth.routes.js'
import groupsRouter from './routes/groups.routes.js'
import monsterRouter from './routes/monster.routes.js'
import onConnection from './socket_io/onConnection.js'
import { ALLOWED_ORIGIN, MONGODB_URI } from './config.js'

import { getDirMonsterparts } from './monster/monster.js'

const app = express()

app.use(cors({ origin: '*' }))

app.use(express.json({ extended: true }))

app.use('/monster/monsterparts', express.static(getFilePath('monster/monsterparts')))

app.use('/api/auth', authRouter)

app.use('/api/groups', groupsRouter)

app.use('/api/monster', monsterRouter)

// getDirMonsterparts()

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(onError)

try {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('🚀 Connected')
} catch (e) {
  onError(e)
}

const server = createServer(app)

const io = new Server(server, {
  cors: ALLOWED_ORIGIN,
  serveClient: false,
})

io.on('connection', (socket) => {
  onConnection(io, socket)
})

// io.on('connection', (socket) => {
//   console.log('user connected')

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })

//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg)
//     console.log('message: ' + msg)
//   })
// })



const PORT = process.env.PORT || 5000

server.listen(PORT, () =>
  console.log(`🚀 Server has been started on port ${PORT}...`)
)

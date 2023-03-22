import { NextFunction, Request, Response } from 'express'
const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http')

import mysqlSession from 'express-session'
import { sessionConfig } from '../secretKeysB'
import getConnection from './dbConnection'
const createChatF = require('./Routers/chat')

app.use(mysqlSession(sessionConfig))

app.use(express.json())
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://118.39.194.152:3000',
      'http://203.232.200.71:3000',
      'http://222.235.130.176:3000',
    ],
    credentials: true,
  }),
)

const session = require('./Routers/session')
const user = require('./Routers/user')
const releaseRoom = require('./Routers/releaseRoom')
const document = require('./Routers/document')
const reply = require('./Routers/reply')
const chat = require('./Routers/chatRouter')

app.use('/session', session)
app.use('/user', user)
app.use('/releaseRoom', releaseRoom)
app.use('/document', document)
app.use('/reply', reply)
app.use('/chat', chat)

app.get('/', (req: Request, res: Response) => {
  res.sendFile(
    'C:/Users/skant/OneDrive/Desktop/Projects/RealEstate/dist/index.html',
  )
})

app.get('/main.js', (req: Request, res: Response) => {
  res.sendFile(
    'C:/Users/skant/OneDrive/Desktop/Projects/RealEstate/dist/main.js',
  )
})

const server = http.createServer(app).listen(3001, function () {
  console.log('Express server listening')
})

//소켓 통신

const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})

const wrap = (middleware: any) => (socket: any, next: any) =>
  middleware(socket.request, {}, next)

io.use(wrap(mysqlSession(sessionConfig)))

io.on('connection', async (socket: any) => {
  console.log('connected')
  console.log(socket.request.session)
  console.log(socket.id)

  const connection = await getConnection()
  const [
    data,
  ]: any = await connection.query(
    'select * from chatRoom where chatParticipant = ?',
    [socket.request.session.Uid],
  )

  socket.join(data.map((data: any, i: number) => data.chatRoom))

  socket.on('sendChat', async (rcv: any) => {
    await createChatF(rcv.roomNum, socket.request.session.Uid, rcv.data)
    socket.broadcast.to(rcv.roomNum).emit('sendChat', {
      data: rcv.data,
      roomNum: rcv.roomNum,
      time: new Date(),
    })
  })
})

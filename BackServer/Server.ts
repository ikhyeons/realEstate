import { Request, Response } from 'express'
import { Socket } from 'socket.io'
import express from 'express'
import cors from 'cors'

import path from 'path'
const http = require('http')

import mysqlSession from 'express-session'
import { sessionConfig } from '../secretKeysB'
import getConnection from './dbConnection'
import { FieldPacket, RowDataPacket } from 'mysql2'
import { createChatF } from './Routers/chat'

interface DocValue {
  docNum: number | null
  docTitle: string | ''
  docContent: string | ''
  userName: string | ''
  makeDate: string | ''
  view: number | null
  docWriter: string
  del?: number
}

interface chatRoom extends RowDataPacket {
  chatRoomNum: number
  roomAddress: string
  chatParticipant: number
  chatOther: number
  chatRoomroomMakeDate: string
}

type docValueMysql = DocValue & RowDataPacket

interface chatRcv {
  roomNum: string
  data: string
}

interface replyRcv {
  docNum: string
  data: string
}

const app = express()

app.use(mysqlSession(sessionConfig))

app.use(express.json({ limit: '50mb' }))
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

const server = http.createServer(app).listen(3001, function () {
  console.log('Express server listening')
})

const ios = require('express-socket.io-session') // 소켓 내에서 세션데이터 접근 가능하도록하는 모듈

const io = require('socket.io')(server, {
  cors: {
    origin: ['*'],
    credentials: true,
  },
})

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
  res.sendFile(path.join(__dirname, '..', '/dist/index.html'))
})

app.get('/main.js', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '/dist/main.js'))
})

//소켓 통신
const docSocket = io.of('/doc')
const chatSocket = io.of('/chat')

chatSocket.use(ios(mysqlSession(sessionConfig), { autoSave: true })) // 모듈과 세션 연결
docSocket.use(ios(mysqlSession(sessionConfig), { autoSave: true })) // 모듈과 세션 연결

chatSocket.on('connection', async (socket: Socket) => {
  const connection = await getConnection()
  const [data]: [
    chatRoom[],
    FieldPacket[],
  ] = await connection.query(
    'select * from chatRoom where chatParticipant = ?',
    [socket.handshake.session.Uid],
  )
  socket.join([
    ...data.map((data, i: number) => data.chatRoom),
    String(socket.handshake.session.Uid),
  ])

  socket.on('sendChat', async (rcv: chatRcv) => {
    const [data]: [
      chatRoom[],
      FieldPacket[],
    ] = await connection.query(
      'select * from chatRoom where chatParticipant = ?',
      [socket.handshake.session.Uid],
    )
    socket.join([
      ...data.map((data, i: number) => data.chatRoom),
      String(socket.handshake.session.Uid),
    ])

    createChatF(rcv.roomNum, socket.handshake.session.Uid, rcv.data).then(
      () => {
        socket.broadcast.to(rcv.roomNum).emit('sendChat', {
          data: rcv.data,
          roomNum: rcv.roomNum,
          time: new Date(),
        })
      },
    )
  })

  socket.on('createChat', async (rcv) => {
    socket.join(String(rcv))
    socket.broadcast.to(String(rcv)).emit('createChat')
    socket.leave(String(rcv))
  })
})

docSocket.on('connection', async (socket: Socket) => {
  const connection = await getConnection()
  const [data]: [
    docValueMysql[],
    FieldPacket[],
  ] = await connection.query(
    'SELECT * FROM document WHERE docWriter = ? AND del = 0',
    [socket.handshake.session.Uid],
  )
  socket.join([
    ...data.map((data, i: number) => String(data.docNum)),
    String(socket.handshake.session.Uid),
  ])

  socket.on('writeReply', async (rcv: replyRcv) => {
    socket.join(String(rcv.docNum))
    socket.broadcast.to(String(rcv.docNum)).emit('writeReply', {
      data: rcv.data,
      docNum: rcv.docNum,
      time: new Date(),
    })
    socket.leave(String(rcv.docNum))
  })

  socket.on('createReply', async (rcv: number) => {
    socket.join(String(rcv))
    socket.broadcast.to(String(rcv)).emit('createReply')
    socket.leave(String(rcv))
  })
})

import { NextFunction, Request, Response } from 'express'
const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http')

import mysqlSession from 'express-session'
import { sessionConfig } from '../secretKeysB'

app.use(mysqlSession(sessionConfig))

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'], // 모든 출처 허용 옵션. true 를 써도 된다.
    credentials: true,
  }),
)

const session = require('./Routers/session')
const user = require('./Routers/user')
const releaseRoom = require('./Routers/releaseRoom')
const document = require('./Routers/document')
const reply = require('./Routers/reply')
const chat = require('./Routers/chat')

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

io.on('connection', (socket: any) => {
  console.log('connected')
  socket.on('frontToBack', (rcv: any) => {
    console.log(socket)
    console.log(rcv)
    io.emit('backToFront', 'qd')
  })
})

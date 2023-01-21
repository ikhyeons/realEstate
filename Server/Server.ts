import { Request, Response } from 'express'
const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
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
  res.send('hi')
})

//get → url요청

app.listen(3001, () => {
  console.log(`server is listening at localhost:3001`)
})

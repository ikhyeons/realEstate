import { Request, Response } from 'express'
const express = require('express')
const app = express()

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

const { getConnection } = require('./dbConnection')

const router = express.Router()

app.get('/', (req: Request, res: Response) => {
  res.send('hi')
})

app.listen(3001, () => {
  console.log(`server is listening at localhost:3001`)
})

app.get('/1', async (req: Request, res: Response) => {
  const connection = await getConnection()
  const [
    userData,
  ] = await connection.query('select * from user where userName = ?', [1])
  res.send(userData)
})

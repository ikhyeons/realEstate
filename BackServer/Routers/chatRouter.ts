const express = require('express')
const router = express.Router()
import { Request, Response } from 'express'
import { getConnection } from '../dbConnection'

//내가 참여한 채팅방을 읽는 함수
router.get('/readMyChatRoom', async (req: Request, res: Response) => {
  const userNum = req.session.Uid

  //db연결을 위해 pool에서 커넥션을 대여함
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      //데이터를 입력하는 쿼리

      const [
        data,
      ] = await connection.query(
        'select * from chatRoom where chatParticipant = ?',
        [userNum],
      )
      //데이터 쿼리 종료 후 대여한 커넥션을 반납함
      connection.release()
      //결과가 성공이면 result 0
      res.send({ result: 0, data: data })
    } catch (err) {
      //db에서 에러나 났을 경우 커넥션을 반납하고
      connection.release()
      //에러로그를 출력함
      console.log(err)
      res.send({ result: 3 })
    }
  } else {
    res.send({ result: 2 })
  }
})

router.post('/createChatRoom', async (req: Request, res: Response) => {
  const roomAddress = req.body.roomAddress
  const userNum = req.session.Uid
  const otherNum = req.body.otherNum

  //db연결을 위해 pool에서 커넥션을 대여함
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      //데이터를 입력하는 쿼리
      await connection.query(
        'insert into chatRoom values (default, ?, ?, ?), (default, ?, ?, ?)',
        [
          roomAddress,
          userNum,
          String(userNum) + String(otherNum),
          roomAddress,
          otherNum,
          String(userNum) + String(otherNum),
        ],
      )

      //데이터 쿼리 종료 후 대여한 커넥션을 반납함
      connection.release()
      //결과가 성공이면 result 0
      res.send({ result: 0 })
    } catch (err) {
      //db에서 에러나 났을 경우 커넥션을 반납하고
      connection.release()
      //에러로그를 출력함
      console.log(err)
      res.send({ result: 3 })
    }
  } else {
    res.send({ result: 2 })
  }
})

//해당 채팅방의 채팅들을 읽는 함수
router.get('/readChat/:chatRoomNum', async (req: Request, res: Response) => {
  const chatRoomNum = req.params.chatRoomNum

  //db연결을 위해 pool에서 커넥션을 대여함
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      //데이터를 입력하는 쿼리
      const [
        data,
      ]: any = await connection.query(
        'select * from chat where chatRoomNum = ?',
        [chatRoomNum],
      )

      const setMyData = data.map((data: any, i: number) =>
        data.chatWriter === req.session.Uid
          ? { ...data, my: 1 }
          : { ...data, my: 0 },
      )
      //데이터 쿼리 종료 후 대여한 커넥션을 반납함
      connection.release()
      //결과가 성공이면 result 0
      res.send({ result: 0, data: setMyData })
    } catch (err) {
      //db에서 에러나 났을 경우 커넥션을 반납하고
      connection.release()
      //에러로그를 출력함
      console.log(err)
      res.send({ result: 3 })
    }
  } else {
    res.send({ result: 2 })
  }
})

module.exports = router

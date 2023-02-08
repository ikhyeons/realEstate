const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()
import { getConnection } from '../dbConnection'

router.post('/createChat', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const chatRoomNum = req.body.chatRoomNum // 어느 채팅방인지
  //const chatParticipantNum = req.body.chatParticipantNum //누가 작성했는지
  //const chatContent = req.body.chatContent // 채팅 내용

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  if (req.session.isLogin) {
    try {
      //데이터를 입력하는 쿼리
      await connection.query(
        'insert into chat values (default, ?, ?, ?, default, default)',
        [1, 1, '1'],
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
      //프론트로 에러코드 result 3을 보냄
      res.send({ result: 3 })
    }
  } else {
    res.send({ result: 1 })
  }
})

router.get('/readChat', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const chatRoomNum = req.body.chatRoomNum // 어느 채팅방인지
  if (req.session.isLogin) {
    //db연결을 위해 pool에서 커넥션을 대여함
    const connection = await getConnection()
    try {
      //데이터를 입력하는 쿼리
      const [
        data,
      ] = await connection.query('select * from chat where chatRoomNum = ?', [
        1,
      ])
      //데이터 쿼리 종료 후 대여한 커넥션을 반납함
      connection.release()
      //결과가 성공이면 result 0
      res.send({ result: 0, data: data })
    } catch (err) {
      //db에서 에러나 났을 경우 커넥션을 반납하고
      connection.release()
      //에러로그를 출력함
      console.log(err)
      //프론트로 에러코드 result 3을 보냄
      res.send({ result: 3 })
    }
  } else {
    res.send({ result: 1 })
  }
})

module.exports = router

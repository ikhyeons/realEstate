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

      const [data] = await connection.query(
        `SELECT 
        chatRoom.*, username,
        (SELECT chatcontent FROM chat WHERE chat.chatRoomNum = chatRoom.chatRoom ORDER BY chatNum DESC LIMIT 1) AS chatContent, 
        (SELECT makeDate FROM chat WHERE chat.chatRoomNum = chatRoom.chatRoom ORDER BY chatNum DESC LIMIT 1) AS makeDate, 
        (SELECT COUNT(*) FROM chat WHERE chat.chatRoomNum = chatRoom.chatRoom AND NOT chatWriter IN(?) AND checked=0 ORDER BY chatNum DESC LIMIT 1) AS cnt
        FROM chatRoom LEFT JOIN chat ON chat.chatRoomNum = chatRoom.chatRoom 
        LEFT JOIN user ON user.userNum = chatRoom.chatOther 
        WHERE chatParticipant = ?
        GROUP BY chatRoom.chatRoomNum
        ORDER BY makeDate DESC`,
        [req.session.Uid, userNum],
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
      //이미 방이 존재하는지 확인하는 쿼리
      const [
        data,
      ]: any = await connection.query(
        'SELECT * FROM chatRoom WHERE chatRoom = ?',
        [String(userNum) + 'N' + String(otherNum)],
      )

      if (data[0]) {
        //데이터 쿼리 종료 후 대여한 커넥션을 반납함
        connection.release()
        //결과가 성공이면 result 0
        res.send({ result: 1 })
      } else {
        //데이터를 입력하는 쿼리
        await connection.query(
          'insert into chatRoom values (default, ?, ?, ?, ?, default), (default, ?, ?, ?, ?, default)',
          [
            roomAddress,
            userNum,
            otherNum,
            String(userNum) + 'N' + String(otherNum),
            roomAddress,
            otherNum,
            userNum,
            String(userNum) + 'N' + String(otherNum),
          ],
        )

        //데이터 쿼리 종료 후 대여한 커넥션을 반납함
        connection.release()
        //결과가 성공이면 result 0
        res.send({ result: 0 })
      }
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
      //데이터를 읽는
      const [
        data,
      ]: any = await connection.query(
        'select * from chat where chatRoomNum = ?',
        [chatRoomNum],
      )

      //읽었을 때 해당 방의 상대 check를 모두 1로 바꿈
      await connection.query(
        'UPDATE chat SET checked=1 WHERE chatRoomNum = ? AND NOT chatWriter IN(?)',
        [chatRoomNum, req.session.Uid],
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

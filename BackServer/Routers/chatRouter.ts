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
        'select * from chat where chatParticipant = ?',
        [userNum],
      )
      //데이터 쿼리 종료 후 대여한 커넥션을 반납함
      connection.release()
      //결과가 성공이면 result 0
      return { result: 0, data: data }
    } catch (err) {
      //db에서 에러나 났을 경우 커넥션을 반납하고
      connection.release()
      //에러로그를 출력함
      console.log(err)
      return { result: 3 }
    }
  } else {
    return { result: 2 }
  }
})

module.exports = router

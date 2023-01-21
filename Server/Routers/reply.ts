const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()
import { getConnection } from '../dbConnection'

//댓글 작성 라우팅
router.post('/createReply', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const docNum = req.body.docNum // 어느 글에 작성했는지

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    await connection.query(
      'insert into reply values (default, ?, ?, ?, default) ',
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
})

router.get('/readReply', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //댓글을 불러오는 쿼리
    const [
      data,
    ] = await connection.query('select * from reply where docNum = ?', [1])
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
})

router.post('/updateReply', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const replyNum = req.body.replyNum
  //const content = req.body.content

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //댓글을 불러오는 쿼리
    await connection.query(
      'update reply set replyContent = ? where repNum = ?',
      ['gdgd', 1],
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
})

router.post('/deleteReply', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const replyNum = req.body.replyNum

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //댓글을 불러오는 쿼리
    await connection.query('delete from reply where repNum = ?', [1])
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
})

module.exports = router

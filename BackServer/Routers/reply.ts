const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()
import { getConnection } from '../dbConnection'
import { FieldPacket, RowDataPacket } from 'mysql2'

interface replyMysql extends RowDataPacket {
  repNum: number
  docNum: number
  replyWriter: number
  replyContent: string
  makeDate: string
  del: number
  checked: number
}

//댓글 작성 라우팅
router.post('/createReply', async (req: Request, res: Response) => {
  const userNum = req.session.Uid // 유저번호는 세션에서 가져옴
  const docNum = req.body.docNum // 어느 글에 작성했는지
  const replyContent = req.body.content.replace(/(\n|\r\n)/g, '\n') // 댓글 내용

  if (req.session.isLogin) {
    //db연결을 위해 pool에서 커넥션을 대여함
    const connection = await getConnection()

    try {
      //데이터를 입력하는 쿼리
      await connection.query(
        'insert into reply values (default, ?, ?, ?, default, default, default)',
        [docNum, userNum, replyContent],
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

router.get('/readReply/:docNum', async (req: Request, res: Response) => {
  const docNum = req.params.docNum
  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //댓글을 불러오는 쿼리
    const [data] = await connection.query(
      `SELECT 
        repNum, docNum, userName, replyContent, makeDate
        FROM reply 
        LEFT JOIN user ON user.userNum = reply.replyWriter
        WHERE docNum = ? and del = 0 
        ORDER BY repNum DESC`,
      [docNum],
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
    //프론트로 에러코드 result 3을 보냄
    res.send({ result: 3 })
  }
})

router.post('/updateReply', async (req: Request, res: Response) => {
  const replyNum = req.body.repNum
  const content = req.body.content

  if (req.session.isLogin) {
    //db연결을 위해 pool에서 커넥션을 대여함
    const connection = await getConnection()

    const [data]: [
      replyMysql[],
      FieldPacket[],
    ] = await connection.query(
      'select replyWriter from reply where repNum = ?',
      [replyNum],
    )
    if (data[0].replyWriter === req.session.Uid) {
      try {
        //댓글을 불러오는 쿼리
        await connection.query(
          'update reply set replyContent = ? where repNum = ?',
          [content, replyNum],
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
      res.send({ result: 2 })
    }
  } else {
    res.send({ result: 1 })
  }
})

router.post('/deleteReply', async (req: Request, res: Response) => {
  const userNum = req.session.Uid // 유저번호는 세션에서 가져옴
  const replyNum = req.body.repNum

  if (req.session.isLogin) {
    //db연결을 위해 pool에서 커넥션을 대여함
    const connection = await getConnection()
    try {
      //댓글을 불러오는 쿼리
      await connection.query('UPDATE reply SET del = 1 WHERE repNum = ?', [
        replyNum,
      ])
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

module.exports = router

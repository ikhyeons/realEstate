const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()

import { getConnection } from '../dbConnection'

//회원가입 라우팅
router.post('/join', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const docNum = req.body.docNum // 어느 글에 작성했는지

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    await connection.query(
      'insert into user values (default, ?, ?, ?, ?, default, null, null, null, null)',
      ['1', '1', '1', '1'],
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

//유저 정보 라우팅
router.get('/readUserInfo', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    const [
      data,
    ] = await connection.query('select * from user where userNum = ?', [1])
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

//유저 정보 수정 라우팅
router.post('/updateUserInfo', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    await connection.query(
      'update user set userName = ?, userAddress = ? where userNum = ?',
      ['2', '2', 1],
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

//유저 제거 라우팅
router.post('/deleteUser', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    await connection.query('delete from user where userNum = ?', [1])
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

const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()
import { FieldPacket, RowDataPacket } from 'mysql2'
import { getConnection } from '../dbConnection'

interface userInfo extends RowDataPacket {
  userNum: number
  userName: string
  userID: string
  userPW: string
  userAddress: string
  isRelease: number
  roomPay: string | null
  roomAddress: string | null
  roomPeriod: string | null
  roomDoc: string | null
}

//회원가입 라우팅
router.post('/join', async (req: Request, res: Response) => {
  console.log(req.body)
  const {
    userName,
    userID,
    password,
    address,
    zonecode,
    detail,
  } = req.body.joinValue
  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //이미 있는 아이디면 return 1 하기
    const [isThere]: [
      userInfo[],
      FieldPacket[],
    ] = await connection.query('SELECT * FROM USER WHERE userID = ?', [userID])

    if (isThere.length) {
      //만약 데이터가 없으면 result 1
      res.send({ result: 1 })
    } else {
      //만약 데이터가 있으면 result 1
      await connection.query(
        'insert into user values (default, ?, ?, ?, ?, ?, default, null, null, null, null)',
        [userName, userID, password, address, detail],
      )
      res.send({ result: 0 })
    }
    //데이터를 입력하는 쿼리
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 에러없이 성공이면 result 0
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
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      //데이터를 입력하는 쿼리
      const [data] = await connection.query(
        'select * from user where userNum = ?',
        [],
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
  } else {
    res.send({ result: 1 })
  }
})

//유저 정보 수정 라우팅
router.get('/updateUserInfo', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //db연결을 위해 pool에서 커넥션을 대여함

  if (req.session.isLogin) {
    // 만약 로그인 되어있으면. 정상 작동
    const connection = await getConnection()
    try {
      //데이터를 입력하는 쿼리
      await connection.query(
        'update user set userName = ?, userAddress = ? where userNum = ?',
        ['2', '2', 14],
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
    // 만약 로그인 되어있지 않으면
    res.send({ result: 1 })
  }
})

//유저 제거 라우팅
router.post('/deleteUser', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴

  if (req.session.isLogin) {
    // 만약 로그인 되어있으면 함수작동.
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
  } else {
    //미 로그인 시
    res.send({ result: 1 })
  }
})

module.exports = router

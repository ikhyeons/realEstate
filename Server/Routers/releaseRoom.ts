const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()
import { getConnection } from '../dbConnection'

//방 내놓기 on off 설정을 하기위한 라우팅
router.get('/setRelease', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const isRelease = req.body.isRelease // 변경된 Release 상태

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    await connection.query('UPDATE user SET isRelease = ? WHERE userNum = ?', [
      1,
      1,
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
})

//방 내놓기 정보 설정을 위한 라우팅
router.post('/setRoomContent', async (req: Request, res: Response) => {
  //const userNum = session.id // 유저번호는 세션에서 가져옴
  //const pay = req.body.pay // 입력된 가격
  //const address = req.body.address // 입력된 주소
  //const period = req.body.period // 입력된 기간
  //const doc = req.body.doc // 입력된 글
  //const options = req.body.options // 입력된 방 옵션들(배열)
  //const pictures = req.body.options // 입력된 방 사진들(배열)

  const options = ['세탁기', '싱크대', '침대']

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //옵션 데이터를 입력하는 쿼리
    options.map(async (data) => {
      await connection.query('insert into roomOption values(default, ?, ?)', [
        1,
        data,
      ])
    })
    //옵션을 제외한 나머지 데이터를 입력하는 쿼리
    await connection.query(
      'UPDATE user SET roomPay = ?, roomAddress = ?, roomPeriod = ?, roomDoc = ?  WHERE userNum = ?',
      [1, 1, 1, 1, 1],
    )

    /* 
    사진을 저장하는 쿼리
    pictures.map((data) => {
      connection.query('insert into roomPicture values(default, ?, ?)', [1, 1]) // 두번째 인자 multer적용 후 pictures로 변경해야 함.
    })
    */

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

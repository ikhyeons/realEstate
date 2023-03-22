const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()
import { getConnection } from '../dbConnection'

import multer from 'multer'
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/skant/OneDrive/Desktop/Projects/RealEstate/uploadImgs')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext)
  },
})

const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
  storage: storage,
})

//방 내놓기 정보 설정을 위한 라우팅
router.post('/setRoomContent', async (req: Request, res: Response) => {
  const userNum = req.session.Uid // 유저번호는 세션에서 가져옴
  const roomDeposit = req.body.deposit // 입력된 보증금
  const roomMonthly = req.body.monthly // 입력된 보증금
  const address = req.body.address // 입력된 주소
  const detailAddress = req.body.detail // 입력된 주소 상세
  const year = req.body.roomYear // 입력된 기간
  const month = req.body.roomMonth // 입력된 기간
  const doc = req.body.doc // 입력된 글
  const lng = req.body.lng // 위경도
  const lat = req.body.lat // 위경도
  const options = req.body.options // 입력된 방 옵션들(배열)

  //db연결을 위해 pool에서 커넥션을 대여함
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      //옵션 데이터를 입력하는 쿼리

      await connection.query('DELETE FROM roomOption WHERE userNum = ?', [
        userNum,
      ])

      options.map(async (data: any) => {
        await connection.query('INSERT INTO roomOption VALUES(default, ?, ?)', [
          userNum,
          data,
        ])
      })
      //옵션을 제외한 나머지 데이터를 입력하는 쿼리
      await connection.query(
        'UPDATE user SET isRelease = 1, roomDeposit = ?, roomMonthly = ?, roomDetailAddress = ?, roomDate = ?, roomDoc = ?, roomAddress = ?, roomLng = ?, roomLat = ? WHERE userNum = ?',
        [
          roomDeposit,
          roomMonthly,
          detailAddress,
          `${year}.${month}`,
          doc,
          address,
          lng,
          lat,
          userNum,
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
      //프론트로 에러코드 result 3을 보냄
      res.send({ result: 3 })
    }
  } else {
    res.send({ result: 1 })
  }
})

//이미지 업로드 핸들링
router.post(
  '/uploadImgs',
  upload.array('inputImgs', 10),
  async (req: Request, res: Response) => {
    //db연결을 위해 pool에서 커넥션을 대여함
    if (req.session.isLogin) {
      const connection = await getConnection()
      try {
        //이전 입력된 사진을 제거하는 쿼리
        await connection.query('DELETE FROM roomPicture WHERE userNum = ?', [
          req.session.Uid,
        ])
        //사진을 입력하는 쿼리
        const files: any = req.files
        files?.map(async (data: Express.Multer.File) => {
          await connection.query(
            'insert into roompicture values(default, ?, ?)',
            [req.session.Uid, data.filename],
          )
        })

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
  },
)

//방 내놓기 정보 설정을 위한 라우팅
router.post('/setRelease', async (req: Request, res: Response) => {
  const userNum = req.session.Uid // 유저번호는 세션에서 가져옴

  //db연결을 위해 pool에서 커넥션을 대여함
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      await connection.query(
        'UPDATE user SET isRelease = 1 WHERE userNum = ?',
        [userNum],
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

router.post('/setUnRelease', async (req: Request, res: Response) => {
  const userNum = req.session.Uid // 유저번호는 세션에서 가져옴

  //db연결을 위해 pool에서 커넥션을 대여함
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      await connection.query(
        'UPDATE user SET isRelease = 0 WHERE userNum = ?',
        [userNum],
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

//방 옵션과 이미지 읽어오기
router.get('/readRoomOption', async (req: Request, res: Response) => {
  const userNum = req.session.Uid // 유저번호는 세션에서 가져옴

  //db연결을 위해 pool에서 커넥션을 대여함
  if (req.session.isLogin) {
    const connection = await getConnection()
    try {
      const [
        options,
      ] = await connection.query('SELECT * FROM roomOption WHERE userNum = ?', [
        userNum,
      ])

      //데이터 쿼리 종료 후 대여한 커넥션을 반납함
      connection.release()
      //결과가 성공이면 result 0
      res.send({ result: 0, options: options })
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

//방 옵션과 이미지 읽어오기
router.get('/readImg/:fileName', async (req: Request, res: Response) => {
  const fileName = req.params.fileName

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    fileName
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 성공이면 result 0
    res.sendFile(
      `C:/Users/skant/OneDrive/Desktop/Projects/RealEstate/uploadImgs/${fileName}`,
    )
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

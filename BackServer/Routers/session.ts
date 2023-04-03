const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()
import { getConnection } from '../dbConnection'
import { FieldPacket, RowDataPacket } from 'mysql2'

interface userInfoMysql extends RowDataPacket {
  userNum: number
  userName: string
  userID: string
  userPW: string
  addressDetail: string
  isRelease: number
  roomDeposit: number
  roomMonthly: number
  roomAddress: string
  roomDetailAddress: string
  roomLat: number
  roomLng: number
  roomDate: string
  roomDoc: string
}

router.post('/login', async (req: Request, res: Response) => {
  const connection = await getConnection()
  const { userID, password } = req.body
  try {
    const [data]: [
      userInfoMysql[],
      FieldPacket[],
    ] = await connection.query('select * from user where userID = ?', [userID])
    if (data[0]) {
      if (data[0].userPW === password) {
        req.session.isLogin = true
        req.session.Uid = data[0].userNum
        res.cookie('isLogin', true, { httpOnly: false })
        req.session.save(() => {})
        res.send({ result: 0 })
      } else {
        res.send({ result: 2 })
      }
    } else {
      res.send({ result: 1 })
    }
    connection.release()
  } catch (err) {
    //db에서 에러나 났을 경우 커넥션을 반납하고
    connection.release()
    //에러로그를 출력함
    console.log(err)
    //프론트로 에러코드 result 3을 보냄
    res.send({ result: 3 })
  }
})

router.post('/logout', (req: Request, res: Response) => {
  if (req.session.isLogin === true) {
    req.session.destroy((err) => {
      console.log('정상 로그아웃!')
      res.clearCookie('connect.sid')
      res.clearCookie('isLogin')
      res.send({ result: 0 })
    })
  } else {
    console.log('정상 로그아웃 실패!')
    res.clearCookie('connect.sid')
    res.clearCookie('isLogin')
    res.send({ result: 1 })
  }
})

module.exports = router

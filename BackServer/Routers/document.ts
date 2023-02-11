const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()

import { getConnection } from '../dbConnection'

//글 목록 보기
router.get('/readDocList/:pageNum', async (req: Request, res: Response) => {
  //페이지 넘버
  const pageNum: number = Number(req.params.pageNum)
  const startNum = 1 + 28 * (pageNum - 1) - 1
  const count = 28

  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    const data = await connection.query(
      'SELECT docNum, docTitle, docWriter, view, makeDate FROM document ORDER BY docNum DESC LIMIT ?, ?',
      [startNum, count],
    )
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 성공이면 result 0과 데이터를 날림
    res.setHeader('content-type', 'application/json')
    res.send({ result: 0, data })
  } catch (err) {
    //db에서 에러나 났을 경우 커넥션을 반납하고
    connection.release()
    //에러로그를 출력함
    console.log(err)
    //프론트로 에러코드 result 3을 보냄
    res.send({ result: 3 })
  }
})

//글 갯수를 불러오는 라우팅
router.get('/readDocCount/', async (req: Request, res: Response) => {
  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    const [data]: any = await connection.query('SELECT COUNT(*) FROM document')
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 성공이면 result 0과 데이터를 날림
    res.setHeader('content-type', 'application/json')
    res.send({ result: 0, data: data[0]['COUNT(*)'] })
  } catch (err) {
    //db에서 에러나 났을 경우 커넥션을 반납하고
    connection.release()
    //에러로그를 출력함
    console.log(err)
    //프론트로 에러코드 result 3을 보냄
    res.send({ result: 3 })
  }
})

//글 작성 라우팅
router.post('/writeDoc', async (req: Request, res: Response) => {
  if (req.session.isLogin) {
    //db연결을 위해 pool에서 커넥션을 대여함
    const connection = await getConnection()
    const title = req.body.docData.title // 제목
    const content = req.body.docData.content // 내용
    try {
      //데이터를 입력하는 쿼리
      await connection.query(
        'insert into document values(default, ?, ?, ?, default, default)',
        [title, content, req.session.Uid],
      )
      //데이터 쿼리 종료 후 대여한 커넥션을 반납함
      connection.release()
      //결과가 성공이면 result 0과 데이터를 날림
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

//글 내용 보기 라우팅
router.get('/readDoc', async (req: Request, res: Response) => {
  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  //const writer = session.id //작성자
  //const title = req.body.title // 제목
  //const content = req.body.content // 내용
  try {
    //데이터를 입력하는 쿼리
    const [
      data,
    ] = await connection.query('select * from document where docNum = ?', [1])
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 성공이면 result 0과 데이터를 날림
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

//글 내용 수정 라우팅
router.get('/updateDoc', async (req: Request, res: Response) => {
  if (req.session.isLogin) {
    //db연결을 위해 pool에서 커넥션을 대여함
    const connection = await getConnection()
    //const docNum = req.body.docNum //글 번호
    //const title = req.body.title // 제목
    //const content = req.body.content // 내용
    const [
      data,
    ]: any = await connection.query(
      'select docWriter from document where docNum = ?',
      [2],
    )
    if (data[0].docWriter === req.session.Uid) {
      try {
        //데이터를 입력하는 쿼리
        await connection.query(
          'update document set docTitle = ?, docContent = ? where docNum = ?',
          ['2', '2', 2],
        )
        //데이터 쿼리 종료 후 대여한 커넥션을 반납함
        connection.release()
        //결과가 성공이면 result 0과 데이터를 날림
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
      //작성자 유저 불일치
      res.send({ result: 2 })
    }
  } else {
    res.send({ result: 1 })
  }
})

//글 삭제 라우팅
router.post('/deleteDoc', async (req: Request, res: Response) => {
  if (req.session.isLogin) {
    //db연결을 위해 pool에서 커넥션을 대여함
    const connection = await getConnection()
    //const docNum = req.body.docNum //글 번호

    const [
      data,
    ]: any = await connection.query(
      'select docWriter from document where docNum = ?',
      [2],
    )
    if (data[0].docWriter === req.session.Uid) {
      try {
        //데이터를 입력하는 쿼리
        await connection.query('delete from document where docNum = ?', [1])
        //데이터 쿼리 종료 후 대여한 커넥션을 반납함
        connection.release()
        //결과가 성공이면 result 0과 데이터를 날림
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
      // 작성자와 현재 로그인한 사람이 다를 때
      res.send({ result: 2 })
    }
  } else {
    res.send({ result: 1 })
  }
})

//조회수 증가 라우팅
router.post('/countView', async (req: Request, res: Response) => {
  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  //const docNum = req.body.docNum //글 번호
  try {
    //데이터를 입력하는 쿼리
    await connection.query(
      'update document set view = view + 1 where docNum = ?',
      [2],
    )
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 성공이면 result 0과 데이터를 날림
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

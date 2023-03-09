const express = require('express')
import { getConnection } from '../dbConnection'

//채팅 작성하는 함수
export const createChatF = async (
  chatRoomNum: number,
  userNum: number,
  chatContent: string,
) => {
  const connection = await getConnection()

  //데이터를 입력하는 쿼리
  try {
    await connection.query(
      'insert into chat values (default, ?, ?, ?, default, default)',
      [chatRoomNum, userNum, chatContent],
    )
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 성공이면 result 0
    console.log('success')
  } catch (err) {
    //db에서 에러나 났을 경우 커넥션을 반납하고
    connection.release()
    console.log(err)
    //에러로그를 출력함
  }
}

//채팅 읽는 함수
export const reatChat = async (chatRoomNum: number) => {
  //db연결을 위해 pool에서 커넥션을 대여함
  const connection = await getConnection()
  try {
    //데이터를 입력하는 쿼리
    const [
      data,
    ] = await connection.query('select * from chat where chatRoomNum = ?', [
      chatRoomNum,
    ])
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release()
    //결과가 성공이면 result 0
    console.log('success')
    return data
  } catch (err) {
    //db에서 에러나 났을 경우 커넥션을 반납하고
    connection.release()
    //에러로그를 출력함
    console.log(err)
  }
}

module.exports = createChatF

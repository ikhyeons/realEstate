import { getConnection } from "../dbConnection";

//채팅 작성하는 함수
export const createChatF = async (
  chatRoomNum: string,
  userNum: number,
  chatContent: string
) => {
  const connection = await getConnection();
  //데이터를 입력하는 쿼리
  try {
    await connection.query(
      "insert into chat values (default, ?, ?, ?, default, default)",
      [chatRoomNum, userNum, chatContent]
    );
    //데이터 쿼리 종료 후 대여한 커넥션을 반납함
    connection.release();
    //결과가 성공이면 result 0
  } catch (err) {
    //db에서 에러나 났을 경우 커넥션을 반납하고
    connection.release();
    console.log(err);
    //에러로그를 출력함
  }
};

export default createChatF;

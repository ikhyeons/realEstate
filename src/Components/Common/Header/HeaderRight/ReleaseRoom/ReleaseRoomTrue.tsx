import styled from 'styled-components'
import { useQuery } from 'react-query'
import axios from 'axios'

const SInfoMain = styled.div`
  margin-top: 5px;
  margin-bottom: 2px;
  display: flex;
`
const SInfoLeft = styled.div`
  width: 40%;
  margin-right: 5px;
`
const SMainImg = styled.img`
  width: 100%;
`
const SInfoRight = styled.div`
  width: 40%;
`
const SPictures = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`
const SPictureView = styled.img`
  height: 400px;
  width: 100%;
`
const SPictureList = styled.ol`
  display: flex;
  height: 100px;
`
const SPictureLists = styled.li`
  height: 100%;
  margin-right: 5px;
`
const SInnerPicture = styled.img`
  height: 100%;
`

const SContent = styled.div``

const ReleaseRoomTrue = () => {
  const { status, error, data, refetch } = useQuery(
    ['readUserInfo'],
    () =>
      axios.get(`http://localhost:3001/user/readUserInfo`, {
        withCredentials: true,
      }),
    {
      enabled: false,
    },
  )

  return (
    <>
      <hr />
      <SInfoMain>
        <SInfoLeft>
          <SMainImg
            src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg"
            alt="대체 텍스트"
          />
        </SInfoLeft>
        <SInfoRight>
          <p>{`기간 : ${data?.data.data[0].roomDate + ' 부터' || '미입력'}`}</p>
          <p>{`가격 : ${
            data?.data.data[0].roomDeposit +
              '/' +
              data?.data.data[0].roomMonthly || '미입력'
          }`}</p>
          <p>{`주소 : ${data?.data.data[0].roomAddress || '미입력'}`}</p>
          <p>{`옵션 : ${data?.data.data[0].roomOption || '미입력'}`}</p>
        </SInfoRight>
      </SInfoMain>
      <hr />
      <SPictures>
        <SPictureView src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
        <SPictureList>
          <SPictureLists>
            <SInnerPicture src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
          </SPictureLists>
          <SPictureLists>
            <SInnerPicture src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
          </SPictureLists>
        </SPictureList>
      </SPictures>
      <hr />
      <SContent>${data?.data.data[0].roomDoc || ''}`</SContent>
    </>
  )
}

export default ReleaseRoomTrue

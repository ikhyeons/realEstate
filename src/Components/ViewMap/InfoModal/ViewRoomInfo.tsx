import styled from 'styled-components'

const SInfoMain = styled.div`
  margin-top: 5px;
  margin-bottom: 2px;
  display: flex;
`
const SInfoLeft = styled.div`
  width: 30%;
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
  height: 450px;
  width: 100%;
`
const SPictureList = styled.ol`
  display: flex;
  height: 100px;
`
const SPictureLists = styled.li`
  list-style: none;
  height: 100%;
  margin-right: 5px;
`
const SInnerPicture = styled.img`
  height: 100%;
`

const SContent = styled.div``

const ViewRoomInfo = () => {
  return (
    <>
      <hr />
      <SInfoMain>
        <SInfoLeft>
          <SMainImg src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
        </SInfoLeft>
        <SInfoRight>
          <p>기간 ~ 기간</p>
          <p>가격 / 가격</p>
          <p>위치</p>
          <p>옵션</p>
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
      <SContent>적당한 내용</SContent>
    </>
  )
}

export default ViewRoomInfo

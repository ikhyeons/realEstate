import styled from 'styled-components'

const SDocHeader = styled.div`
  height: 30px;
`

const SDocListBtn = styled.button`
  width: 70px;
  height: 30px;
  background: none;
  margin-bottom: 5px;
`

const SViewMain = styled.div`
  padding: 5px;
`

const STitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 3px;
`

const SDate = styled.span`
  margin-right: 5px;
  margin-left: 5px;
  font-size: 15px;
`

const SContent = styled.div`
  padding: 5px;
  font-size: 17px;
  min-height: 500px;
`

const SWriter = styled.span``

const SRipleMain = styled.div`
  padding: 5px;
  background: lightgray;
`

const SRippleCard = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 3px;
`

const SRippleInfo = styled.div``
const SRippleWriter = styled.span`
  margin-right: 5px;
`
const SRippleDate = styled.span`
  font-size: 13px;
`
const SRippleContent = styled.div`
  padding: 2px 0 10px 10px;
`

const SRippleBtn = styled.span`
  margin-left: 5px;
  font-size: 13px;
`
const DocView = () => {
  return (
    <SViewMain>
      <SDocHeader>
        <SDocListBtn>←글목록</SDocListBtn>
      </SDocHeader>

      <STitle>문서의 제목입니다.</STitle>
      <SDate>2023.01.01</SDate>
      <SWriter>성익현</SWriter>
      <hr />
      <SContent>게시글 내용입니다.</SContent>
      <hr />
      <b>댓글</b>
      <SRipleMain>
        <SRippleCard>
          <SRippleInfo>
            <SRippleWriter>성익현</SRippleWriter>
            <SRippleDate>2023. 1. 2</SRippleDate>
            <SRippleBtn>수정</SRippleBtn>
            <SRippleBtn>삭제</SRippleBtn>
          </SRippleInfo>
          <SRippleContent>댓글 내용입니다.</SRippleContent>
        </SRippleCard>
      </SRipleMain>
    </SViewMain>
  )
}

export default DocView

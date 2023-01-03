import styled from 'styled-components'

const SRipleMain = styled.div`
  padding: 5px;
`
const SwriteRipple = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
  font-size: 17px;
  padding: 4px;
  font-family: none;
`

const SRippleCard = styled.div`
  background: lightgray;
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

const RippleMain = () => {
  return (
    <>
      <b>댓글</b>
      <SRipleMain>
        <SwriteRipple />
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
    </>
  )
}

export default RippleMain

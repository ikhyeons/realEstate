import React from 'react'
import styled from 'styled-components'

import { useRecoilState } from 'recoil'
import { AcurrentRoomId, AIsInfoOn } from '../../AtomStorage'

const SCard = styled.li`
  width: 100%;
  height: 160px;
  border-bottom: 1px solid black;
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const SCardTop = styled.div`
  height: 60%;
  display: flex;
`
const SCardBottomContent = styled.div`
  height: 40%;
  font-size: 20px;
  padding: 5px;
`

const SCardMainImg = styled.img`
  height: 100%;
  width: 124px;
  background: black;
`
const SCardTopRight = styled.div`
  margin-left: 5px;
`
const SCardPeriod = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 1px 0;
  user-select: none;
`
const SCardValue = styled.div`
  font-size: 20px;
  user-select: none;
  position: relative;
  top: -10px;
`
const SCardLocation = styled.div`
  font-size: 17px;
  user-select: none;
  position: relative;
  top: -12px;
`

const SideListCard: React.FC<CardPropsStateProp> = (props) => {
  const [isInfoOn, setIsInfoOn] = useRecoilState(AIsInfoOn)
  const [currentRoomId, setCurrentRoomId] = useRecoilState(AcurrentRoomId)
  return (
    <SCard
      onClick={() => {
        setCurrentRoomId(String(props.data.id))
        setIsInfoOn(true)
      }}
    >
      <SCardTop>
        <SCardMainImg
          src={`http://localhost:3001/releaseRoom/readImg/${props.data.pictureAddress}`}
          alt="메인이미지"
        />
        <SCardTopRight>
          <SCardPeriod>{props.data.date}월 부터</SCardPeriod>
          <SCardValue>{props.data.value}</SCardValue>
          <SCardLocation>{props.data.location}</SCardLocation>
        </SCardTopRight>
      </SCardTop>
      <SCardBottomContent>{props.data.content}</SCardBottomContent>
    </SCard>
  )
}

export default SideListCard

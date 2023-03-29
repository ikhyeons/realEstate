import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  AchatSocket,
  AcurrentChatRoomId,
  AisChatAtom,
  ARcvChatToggle,
} from '../../../../../../AtomStorage'
import { useEffect, useState } from 'react'

const SAlarmCard = styled.li`
  padding: 5px;
  border-radius: 4px;
  background: #ffa;
  position: relative;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  min-height: 70px;
`
const SAlarmCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SAlarmCardName = styled.div`
  font-weight: bold;
  width: 13%;
`

const SAlarmCardAddress = styled.div`
  font-weight: bold;
  width: 67%;
`

const SAlarmCardDate = styled.div`
  font-size: 13px;
  width: 20%;
`
const SAlarmCardContent = styled.div`
  padding: 5px;
`
const SAlarmCardNum = styled.div`
  text-align: center;
  width: 30px;
  background: yellow;
  border-radius: 50%;
  border: 1px solid black;
  padding: 2px;
  position: absolute;
  right: 5px;
  top: 45px;
  transform: translateY(-50%);
`
const AlarmChatCard = (prop: any) => {
  console.log(prop)
  const [isChat, setIsChat] = useRecoilState(AisChatAtom)
  const [currentChatRoomId, setCurrentChatRoomId] = useRecoilState(
    AcurrentChatRoomId,
  )

  const [chatSocket] = useRecoilState(AchatSocket)

  const [isRcv, setIsRcv] = useRecoilState(ARcvChatToggle)

  interface IChatData {
    makeDate: string
    cnt: number
    chatContent: string
  }

  const [updateChatData, setUpdateChatData] = useState<IChatData>({
    makeDate: '',
    cnt: 0,
    chatContent: '',
  })
  useEffect(() => {
    //시작하자마자 프롭스 입력
    setUpdateChatData((prev: any) => {
      if (prop.data.makeDate) {
        return {
          ...prop.data,
          makeDate:
            prop.data.makeDate.slice(2, 4) +
            '.' +
            prop.data.makeDate.slice(5, 7) +
            '.' +
            prop.data.makeDate.slice(8, 10) +
            ' ' +
            prop.data.makeDate.slice(11, 13) +
            '시 ' +
            prop.data.makeDate.slice(14, 16) +
            '분',
        }
      } else {
        return {
          ...prop.data,
          makeDate:
            prop.data.roomMakeDate.slice(2, 4) +
            '.' +
            prop.data.roomMakeDate.slice(5, 7) +
            '.' +
            prop.data.roomMakeDate.slice(8, 10) +
            ' ' +
            prop.data.roomMakeDate.slice(11, 13) +
            '시 ' +
            prop.data.roomMakeDate.slice(14, 16) +
            '분',
        }
      }
    })
  }, [prop.data])

  useEffect(() => {
    chatSocket()?.on('sendChat', (msg: any) => {
      console.log(msg)
      if (String(msg.roomNum) === String(prop.data.chatRoom)) {
        setUpdateChatData((prev: any) => ({
          ...prev,
          makeDate: msg.time,
          cnt: prev.cnt + 1,
          chatContent: msg.data,
        }))
      }
      setIsRcv((prev: number) => (prev === 0 ? 1 : 0))
    })
  }, [])
  console.log(prop)

  return (
    <SAlarmCard
      onClick={() => {
        setCurrentChatRoomId(prop.data.chatRoom)
        setUpdateChatData((prev) => ({ ...prev, cnt: 0 }))
        setIsChat(true)
      }}
    >
      <SAlarmCardHeader>
        <SAlarmCardName>{prop.data.username}</SAlarmCardName>
        <SAlarmCardAddress>{prop.data.roomAddress}</SAlarmCardAddress>
        <SAlarmCardDate>{updateChatData.makeDate}</SAlarmCardDate>
      </SAlarmCardHeader>

      <SAlarmCardContent>{updateChatData.chatContent}</SAlarmCardContent>
      {updateChatData.cnt === 0 ? null : (
        <SAlarmCardNum>{updateChatData.cnt}</SAlarmCardNum>
      )}
    </SAlarmCard>
  )
}

export default AlarmChatCard

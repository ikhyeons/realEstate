import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { AcurrentChatRoomId, AisChatAtom } from '../../../../../../AtomStorage'
import { useQueries } from 'react-query'
import axios from 'axios'
import io from 'socket.io-client'
import Port from '../../../../../../../port'
import { useEffect, useState } from 'react'

const SAlarmCard = styled.li`
  padding: 5px;
  border-radius: 4px;
  background: #ffa;
  position: relative;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
`
const SAlarmCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SAlarmCardAddress = styled.div`
  font-weight: bold;
  width: 72%;
`

const SAlarmCardDate = styled.div`
  font-size: 13px;
  width: 28%;
`
const SAlarmCardContent = styled.div`
  padding: 5px;
`
const SAlarmCardNum = styled.div`
  text-align: center;
  width: 30px;
  height: 30px;
  background: yellow;
  border-radius: 50%;
  border: 1px solid black;
  padding: 2px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`
const socket = io(`ws://${Port}`, { transports: ['websocket'] })

const AlarmChatCard = (prop: any) => {
  const [isChat, setIsChat] = useRecoilState(AisChatAtom)
  const [currentChatRoomId, setCurrentChatRoomId] = useRecoilState(
    AcurrentChatRoomId,
  )

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
    setUpdateChatData((prev: any) => ({
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
    }))
  }, [])

  useEffect(() => {
    socket.on('sendChat', (msg) => {
      console.log(msg)
      if (String(msg.roomNum) === String(prop.data.chatRoom)) {
        setUpdateChatData((prev: any) => ({
          ...prev,
          makeDate: msg.time,
          cnt: prev.cnt + 1,
          chatContent: msg.data,
        }))
      }
    })
  }, [])
  console.log(prop)

  return (
    <SAlarmCard
      onClick={() => {
        setCurrentChatRoomId(prop.data.chatRoom)
        setIsChat(true)
      }}
    >
      <SAlarmCardHeader>
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

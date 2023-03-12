import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { AcurrentChatRoomId, AisChatAtom } from '../../../../../../AtomStorage'
import { useQueries } from 'react-query'
import axios from 'axios'

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

const AlarmChatCard = (prop: any) => {
  const [isChat, setIsChat] = useRecoilState(AisChatAtom)
  const [currentChatRoomId, setCurrentChatRoomId] = useRecoilState(
    AcurrentChatRoomId,
  )

  return (
    <SAlarmCard
      onClick={() => {
        setCurrentChatRoomId(prop.data.chatRoom)
        setIsChat(true)
      }}
    >
      <SAlarmCardHeader>
        <SAlarmCardAddress>{prop.data.roomAddress}</SAlarmCardAddress>
        <SAlarmCardDate>23. 1. 4 오후 6시 9분</SAlarmCardDate>
      </SAlarmCardHeader>

      <SAlarmCardContent>내용</SAlarmCardContent>
      <SAlarmCardNum>99</SAlarmCardNum>
    </SAlarmCard>
  )
}

export default AlarmChatCard

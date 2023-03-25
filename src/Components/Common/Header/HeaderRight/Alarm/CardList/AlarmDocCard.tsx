import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Port from '../../../../../../../port'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { AisAlarmPopOpen, ARcvReplyToggle } from '../../../../../../AtomStorage'
import { useRecoilState } from 'recoil'

const SAlarmCard = styled.li`
  padding: 5px;
  border-radius: 4px;
  background: #eee;
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

const SAlarmCardDocTitle = styled.div`
  font-weight: bold;
  width: 67%;
`

const SAlarmCardDate = styled.div`
  font-size: 13px;
  width: 20%;
`
const SAlarmCardContent = styled.div`
  margin-left: 10px;
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

interface IReplyData {
  RmakeDate: string
  cnt: number
  replyContent: string
}

const socket = io(`ws://${Port}/doc`, { transports: ['websocket'] })
const AlarmDocCard = (prop: any) => {
  const [isAlarmPopOpen, setIsAlarmPopOpen] = useRecoilState(AisAlarmPopOpen)
  const [updateReplyData, setUpdateReplyData] = useState<IReplyData>({
    RmakeDate: '',
    replyContent: '',
    cnt: 0,
  })
  const [isRcv, setIsRcv] = useRecoilState(ARcvReplyToggle)
  const navigate = useNavigate()

  useEffect(() => {
    setUpdateReplyData((prev) => ({
      RmakeDate: prop.data.RmakeDate,
      replyContent: prop.data.replyContent,
      cnt: prop.data.cnt,
    }))
  }, [])

  useEffect(() => {
    socket.on('writeReply', (msg: any) => {
      console.log(msg)
      if (String(msg.docNum) === String(prop.data.docNum)) {
        setUpdateReplyData((prev: any) => ({
          ...prev,
          RmakeDate: msg.time,
          replyContent: msg.data,
          cnt: prev.cnt + 1,
        }))
      }
      setIsRcv((prev: number) => (prev === 0 ? 1 : 0))
    })
  }, [])
  return (
    <SAlarmCard
      onClick={() => {
        setIsAlarmPopOpen(false)
        setUpdateReplyData((prev) => ({ ...prev, cnt: 0 }))
        navigate(`/community/View/${prop.data.docNum}`)
      }}
    >
      <SAlarmCardHeader>
        <SAlarmCardDocTitle>{prop.data.docTitle}</SAlarmCardDocTitle>
        <SAlarmCardDate>
          {updateReplyData.RmakeDate.slice(2, 4) +
            '.' +
            updateReplyData.RmakeDate.slice(5, 7) +
            '.' +
            updateReplyData.RmakeDate.slice(8, 10) +
            ' ' +
            updateReplyData.RmakeDate.slice(11, 13) +
            '시 ' +
            updateReplyData.RmakeDate.slice(14, 16) +
            '분'}
        </SAlarmCardDate>
      </SAlarmCardHeader>

      <SAlarmCardContent>
        <div>{prop.data.userName}</div>
        {updateReplyData.replyContent}
      </SAlarmCardContent>
      <SAlarmCardNum>{updateReplyData.cnt}</SAlarmCardNum>
    </SAlarmCard>
  )
}

export default AlarmDocCard

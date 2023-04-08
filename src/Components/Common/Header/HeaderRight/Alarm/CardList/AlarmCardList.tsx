import styled from 'styled-components'
import { useQuery } from 'react-query'
import axios from 'axios'
import Port from '../../../../../../../port'
import AlarmChatCard from './AlarmChatCard'
import AlarmDocCard from './AlarmDocCard'

import {
  AchatSocket,
  AisAlarmPopOpen,
  AisChatAtom,
  ARcvChatToggle,
  ARcvReplyToggle,
  AreplySocket,
} from '../../../../../../AtomStorage'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'

const SCardList = styled.ul``

const AlarmCardList = () => {
  const [alarmOpen] = useRecoilState(AisAlarmPopOpen)
  const [isRcvChat, setIsRcvChat] = useRecoilState(ARcvChatToggle)
  const [isRcvReply, setIsRcvReply] = useRecoilState(ARcvReplyToggle)

  const [chatSocket] = useRecoilState(AchatSocket)
  const [replySocket] = useRecoilState(AreplySocket)

  useEffect(() => {
    chatSocket()!.on('createChat', () => {
      setIsRcvChat((prev) => (prev === 0 ? 1 : 0))
    })

    replySocket()!.on('createReply', () => {
      setIsRcvReply((prev) => (prev === 0 ? 1 : 0))
    })
  }, [])

  const chatRoom = useQuery<chatRoom>(['readMyChatRoom', alarmOpen], () =>
    axios.get(`http://${Port}/chat/readMyChatRoom`, {
      withCredentials: true,
    }),
  )

  const unCheckReplyDocs = useQuery<unCheckedReply>(
    ['readUnCheckReplyDocs', alarmOpen],
    () =>
      axios.get(`http://${Port}/document/readUnCheckReplyDocs`, {
        withCredentials: true,
      }),
  )

  useEffect(() => {
    chatRoom.refetch()
  }, [isRcvChat])
  useEffect(() => {
    unCheckReplyDocs.refetch()
  }, [isRcvReply])

  return (
    <SCardList>
      {chatRoom.data?.data.data.map((data, i) => (
        <AlarmChatCard key={i} data={data} />
      ))}
      {unCheckReplyDocs.data?.data.data.map((data, i) => (
        <AlarmDocCard
          refetch={() => {
            unCheckReplyDocs.refetch()
          }}
          key={i}
          data={data}
        />
      ))}
    </SCardList>
  )
}

export default AlarmCardList

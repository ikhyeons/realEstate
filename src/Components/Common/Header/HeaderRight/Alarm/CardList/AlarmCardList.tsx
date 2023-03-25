import styled from 'styled-components'
import { useQueries } from 'react-query'
import axios from 'axios'
import Port from '../../../../../../../port'
import AlarmChatCard from './AlarmChatCard'
import AlarmDocCard from './AlarmDocCard'
import io from 'socket.io-client'

import {
  AisAlarmPopOpen,
  ARcvChatToggle,
  ARcvReplyToggle,
} from '../../../../../../AtomStorage'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'

const SCardList = styled.ul``

const chatSocket = io(`ws://${Port}/chat`, { transports: ['websocket'] })
const replySocket = io(`ws://${Port}/doc`, { transports: ['websocket'] })

const AlarmCardList = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AisAlarmPopOpen)
  const [isRcvChat, setIsRcvChat] = useRecoilState(ARcvChatToggle)
  const [isRcvReply, setIsRcvReply] = useRecoilState(ARcvReplyToggle)

  useEffect(() => {
    chatSocket.on('createChat', (msg: any) => {
      setIsRcvChat((prev: number) => (prev === 0 ? 1 : 0))
    })
  }, [])

  useEffect(() => {
    replySocket.on('createReply', (msg: any) => {
      setIsRcvReply((prev: number) => (prev === 0 ? 1 : 0))
    })
  }, [])

  const res = useQueries([
    {
      queryKey: ['readMyChatRoom', alarmOpen, isRcvChat],
      queryFn: () =>
        axios.get(`http://${Port}/chat/readMyChatRoom`, {
          withCredentials: true,
        }),
      onSuccess: (data: any) => {},
    },
    {
      queryKey: ['readUnCheckReplyDocs', alarmOpen, isRcvReply],
      queryFn: () =>
        axios.get(`http://${Port}/document/readUnCheckReplyDocs`, {
          withCredentials: true,
        }),
      onSuccess: (data: any) => {
        console.log(data.data.data)
      },
    },
  ])

  return (
    <SCardList>
      {res[0].data?.data.data.map((data: any, i: number) => (
        <AlarmChatCard key={i} data={data} />
      ))}
      {res[1].data?.data.data.map((data: any, i: number) => (
        <AlarmDocCard refetch={res[1].refetch} key={i} data={data} />
      ))}
    </SCardList>
  )
}

export default AlarmCardList

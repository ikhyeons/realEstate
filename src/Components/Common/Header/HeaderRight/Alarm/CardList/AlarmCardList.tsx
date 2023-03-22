import styled from 'styled-components'
import { useQueries } from 'react-query'
import axios from 'axios'
import Port from '../../../../../../../port'
import AlarmChatCard from './AlarmChatCard'
import AlarmDocCard from './AlarmDocCard'

import { useEffect } from 'react'

const SCardList = styled.ul``

const AlarmCardList = () => {
  const res = useQueries([
    {
      queryKey: ['readMyChatRoom'],
      queryFn: () =>
        axios.get(`http://${Port}/chat/readMyChatRoom`, {
          withCredentials: true,
        }),
      onSuccess: (data: any) => {
        console.log(data.data.data)
      },
    },
    {
      queryKey: ['readUnCheckReplyDocs'],
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

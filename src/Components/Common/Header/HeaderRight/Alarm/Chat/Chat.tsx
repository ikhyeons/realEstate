import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { AcurrentChatRoomId, AisChatAtom } from '../../../../../../AtomStorage'
import io from 'socket.io-client'
import { useEffect, useState, useRef } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Port from '../../../../../../../port'

const SChatHeader = styled.div`
  margin-bottom: 5px;
  background: #ffdf65;
  height: 5%;
`

const SBackbutton = styled.button`
  background: none;
  border: none;
  border-right: 1px solid black;
  padding: 3px;
  margin-right: 5px;
  height: 100%;
  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

const SChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 800px;
`

const SChatView = styled.div`
  background: lightyellow;
  height: 600px;
  margin-bottom: 5px;
  height: 88%;
  overflow: auto;

  &::-webkit-scrollbar {
    background: none;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffdf65;
  }
  &::-webkit-scrollbar-track {
    background: #bbaa99;
  }
`

const SChatInput = styled.textarea`
  width: 100%;
  resize: none;
  font-family: none;
  padding: 5px;
  height: 7%;
`
const SMyChat = styled.div`
  text-align: right;
  background: #eeeeaa;
  margin-bottom: 5px;
  padding: 5px;
`
const SOtherChat = styled.div`
  text-align: left;
  background: #e1e1aa;
  margin-bottom: 5px;
  padding: 5px;
`

const socket = io(`ws://${Port}`, { transports: ['websocket'] })

const Chat = () => {
  const [isChat, setIsChat] = useRecoilState(AisChatAtom)
  const [chatValue, setChatValue] = useState<string>('')
  const [currentChatRoomId, setCurrentChatRoomId] = useRecoilState(
    AcurrentChatRoomId,
  )
  const chatViewRef = useRef<HTMLDivElement>(null)
  const [chatData, setChatData] = useState<any[]>([])

  const { status, error, data, refetch } = useQuery(
    ['readChats'],
    (data) =>
      axios.get(`http://${Port}/chat/readChat/${currentChatRoomId}`, {
        withCredentials: true,
      }),
    {
      enabled: false,
      onSuccess: (data: any) => {
        console.log(data)
        setChatData(
          data?.data.data.map((data: any, i: number) => ({
            my: data.my,
            chatContent: data.chatContent,
          })),
        )
      },
    },
  )

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    socket.on('sendChat', (msg) => {
      console.log(msg)
      if (msg.roomNum === currentChatRoomId)
        setChatData((prev) => [...prev, { my: 0, chatContent: msg.data }])
    })
  }, [])

  useEffect(() => {
    chatViewRef.current?.scrollTo(0, chatViewRef.current.scrollHeight)
  }, [chatData])

  return (
    <SChatWrap>
      <SChatHeader>
        <SBackbutton
          onClick={() => {
            setIsChat(false)
          }}
        >
          ←
        </SBackbutton>
        양덕동 서안양덕타운 성익현
      </SChatHeader>
      <SChatView ref={chatViewRef}>
        {chatData.map((data: any, i: number) =>
          data.my ? (
            <SMyChat key={i}>{data.chatContent}</SMyChat>
          ) : (
            <SOtherChat key={i}>{data.chatContent}</SOtherChat>
          ),
        )}
      </SChatView>
      <SChatInput
        value={chatValue}
        onChange={(e) => {
          setChatValue(e.target.value)
        }}
        onKeyPress={(e) => {
          if (e.code === 'Enter' && e.shiftKey === false) {
            socket.emit('sendChat', {
              roomNum: currentChatRoomId,
              data: chatValue,
            })
            setChatData((prev) => [...prev, { chatContent: chatValue, my: 1 }])
            setChatValue('')
          }
        }}
      />
    </SChatWrap>
  )
}

export default Chat

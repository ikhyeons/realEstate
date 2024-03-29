import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import {
  AchatSocket,
  AcurrentChatRoomId,
  AisChatAtom,
} from '../../../../../../AtomStorage'
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
const Chat = () => {
  const [, setIsChat] = useRecoilState(AisChatAtom)
  const [chatValue, setChatValue] = useState<string>('')
  const [currentChatRoomId] = useRecoilState(AcurrentChatRoomId)
  const [chatSocket] = useRecoilState(AchatSocket)
  const chatViewRef = useRef<HTMLDivElement>(null)
  const [chatData, setChatData] = useState<
    { my: number; chatContent: string }[]
  >([])

  const { status, error, data, refetch } = useQuery<chats>(
    ['readChats'],
    () =>
      axios.get(`http://${Port}/chat/readChat/${currentChatRoomId}`, {
        withCredentials: true,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log(data)
        setChatData(
          data?.data.data.map((data, i) => ({
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
    chatSocket()?.on(
      'sendChat',
      (msg: { data: string; roomNum: string; time: Date }) => {
        console.log(msg)
        if (msg.roomNum === currentChatRoomId)
          setChatData((prev) => [...prev, { my: 0, chatContent: msg.data }])
      },
    )
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
        {chatData.map((data, i) =>
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
            chatSocket()?.emit('sendChat', {
              roomNum: currentChatRoomId,
              data: chatValue,
            })
            setChatData((prev) => [...prev, { chatContent: chatValue, my: 1 }])
            setChatValue('')
          }
        }}
      />
      <button
        onClick={() => {
          chatSocket()?.emit('sendChat', {
            roomNum: currentChatRoomId,
            data: chatValue,
          })
          setChatData((prev) => [...prev, { chatContent: chatValue, my: 1 }])
          setChatValue('')
        }}
      >
        버튼
      </button>
    </SChatWrap>
  )
}

export default Chat

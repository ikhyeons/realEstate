import styled from 'styled-components'
import ViewRoomInfo from './ViewRoomInfo'
import { useRecoilState } from 'recoil'
import {
  AIsInfoOn,
  AisAlarmPopOpen,
  AcurrentRoomId,
  AchatSocket,
} from '../../../AtomStorage'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import Port from '../../../../port'

const SInfoModalBack = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
`

const SInfoMain = styled.div`
  position: relative;
  width: min(900px, 45%);
  height: 100%;
  align-items: center;
  background: white;
  margin: 0 auto;
  padding: 5px;
  overflow-y: auto;
  z-index: 5;
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

const SReq = styled.div`
  width: 98.5%;
  background: yellow;
  position: absolute;
  bottom: 0px;
  height: 35px;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
`

const InfoModalMain = () => {
  const [isInfoOn, setIsInfoOn] = useRecoilState(AIsInfoOn)
  const [, setIsPopOpen] = useRecoilState(AisAlarmPopOpen)
  const [currentRoomId] = useRecoilState(AcurrentRoomId)
  const [chatSocket] = useRecoilState(AchatSocket)

  const { status, error, data, refetch } = useQuery<IReleaseRoomInfo>(
    ['readRoomInfo', currentRoomId, isInfoOn],
    () => axios.get(`http://${Port}/user/readRoomInfo/${currentRoomId}`),
  )
  const createChatRoom = useMutation<mutationData>(
    () =>
      axios.post(
        `http://${Port}/chat/createChatRoom`,
        {
          otherNum: currentRoomId,
          roomAddress:
            data?.data.data[0].roomAddress +
            ' ' +
            data?.data.data[0].roomDetailAddress,
        },
        { withCredentials: true },
      ),
    {
      onSuccess: (data) => {
        if (data.data.result === 2) alert('로그인부터 하세요;')
        else if (data.data.result === 1) {
          alert('이미 방이 형성되어 있습니다.')
          setIsPopOpen(true)
        } else {
          chatSocket()?.emit('createChat', currentRoomId)
          setIsPopOpen(true)
        }
      },
    },
  )

  return (
    <SInfoModalBack
      onClick={() => {
        setIsInfoOn(false)
      }}
    >
      <SInfoMain
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <ViewRoomInfo />
        <SReq
          onClick={() => {
            createChatRoom.mutate()
          }}
        >
          문의하기
        </SReq>
      </SInfoMain>
    </SInfoModalBack>
  )
}

export default InfoModalMain

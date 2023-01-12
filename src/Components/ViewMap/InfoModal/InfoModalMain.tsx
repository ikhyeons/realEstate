import styled from 'styled-components'
import ViewRoomInfo from './ViewRoomInfo'
import { useRecoilState } from 'recoil'
import { AIsInfoOn, AisAlarmPopOpen, AisChatAtom } from '../../../AtomStorage'

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
  width: 800px;
  height: 100%;
  align-items: center;
  background: white;
  margin: 0 auto;
  padding: 5px;
  overflow-y: auto;
  z-index: 5;
`

const SReq = styled.div`
  width: calc(100%);
  background: yellow;
  bottom: 0px;
  height: 35px;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  margin: 10px 0;
`

const InfoModalMain = () => {
  const [isInfoOn, setIsInfoOn] = useRecoilState(AIsInfoOn)
  const [isPopOpen, setIsPopOpen] = useRecoilState(AisAlarmPopOpen)
  const [isChat, setIsChat] = useRecoilState(AisChatAtom)

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
            setIsPopOpen(true)
            setIsChat(true)
          }}
        >
          문의하기
        </SReq>
      </SInfoMain>
    </SInfoModalBack>
  )
}

export default InfoModalMain

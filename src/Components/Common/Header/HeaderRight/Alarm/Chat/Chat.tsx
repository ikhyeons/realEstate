import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { AisChatAtom } from '../../../../../../AtomStorage'

const SChatHeader = styled.div`
  margin-bottom: 5px;
  background: #ffdf65;
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

const SChatView = styled.div`
  background: lightyellow;
  height: 600px;
  margin-bottom: 5px;
`

const SMyChat = styled.div`
  text-align: right;
  background: gray;
  margin-bottom: 5px;
  padding: 5px;
`
const SOtherChat = styled.div`
  text-align: left;
  background: lightgray;
  margin-bottom: 5px;
  padding: 5px;
`

const SChatInput = styled.textarea`
  width: 100%;
  resize: none;
  font-family: none;
  padding: 5px;
`

const Chat = () => {
  const [isChat, setIsChat] = useRecoilState(AisChatAtom)
  return (
    <>
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
      <SChatView>
        <SOtherChat>니꺼</SOtherChat>
        <SMyChat>내꺼</SMyChat>
      </SChatView>
      <SChatInput />
    </>
  )
}

export default Chat

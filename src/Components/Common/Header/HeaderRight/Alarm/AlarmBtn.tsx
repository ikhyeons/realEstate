import styled from 'styled-components'
import { HiBellAlert } from 'react-icons/hi2'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Chat from './Chat/Chat'

import { AisAlarmPopOpen } from '../../../../../AtomStorage'
import { AisChatAtom } from '../../../../../AtomStorage'

import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'

import AlarmCardList from './CardList/AlarmCardList'

const SAlarm = styled.div`
  border-radius: 50%;
  width: 50px;
  background: lightyellow;
  margin: 0 5px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  :hover {
    border: 2px solid black;
  }
`

const SAlarmNumber = styled.div`
  font-weight: normal;
`
const SFilterBtns = styled.div`
  margin-bottom: 3px;
`
const SFilterBtn = styled.button`
  padding: 5px;
  margin-right: 3px;
`

const AlarmBtn = () => {
  const [isPopOpen, setIsPopOpen] = useRecoilState(AisAlarmPopOpen)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isChat, setIsChat] = useRecoilState(AisChatAtom)

  return (
    <>
      <SAlarm
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          /*클릭 했을 때*/
          setAnchorEl(
            event.currentTarget,
          ) /*지금 클릭된 버튼을 anchorEl에 저장함*/
          setIsPopOpen(
            (prev) => !prev,
          ) /*isPopOpen은 팝업창을 열림, 닫음을 결정함, 이전값이 열림이면 닫힘으로, 닫힘이면 열림으로*/
          setIsChat(false)
        }}
      >
        <HiBellAlert
          style={{ transform: 'translate(0, 5px)', fontSize: '20px' }}
        />
        <SAlarmNumber>99</SAlarmNumber>
      </SAlarm>
      <Popover /*로그인 버튼 클릭 시 나오는 팝업 mui*/
        sx={{ marginTop: '12px' }}
        open={isPopOpen} /*isPopOpen이 true면 열림, 아니면 닫힘*/
        onClose={() =>
          setIsPopOpen(false)
        } /*isPopOpen을 false로 바꾸어 닫히게 하는 함수*/
        anchorEl={anchorEl} /*어느 버튼에 종속할 건지 결정*/
        anchorOrigin={{
          /*클릭했을 때 튀어나오는 위치*/
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box sx={{ padding: '6px', width: '600px' }}>
          {isChat === false ? (
            <>
              <SFilterBtns>
                <SFilterBtn>채팅</SFilterBtn>
                <SFilterBtn>커뮤니티</SFilterBtn>
              </SFilterBtns>
              <AlarmCardList />
            </>
          ) : (
            <Chat />
          )}
        </Box>
      </Popover>
    </>
  )
}

export default AlarmBtn

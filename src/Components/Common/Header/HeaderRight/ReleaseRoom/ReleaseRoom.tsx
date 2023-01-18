import { useState } from 'react'
import styled from 'styled-components'

import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'

import ReleaseRoomTrue from './ReleaseRoomTrue'
import ReleaseRoomModify from './ReleaseRoomModify'

const ReleaseRoom = () => {
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const canBeOpen = isPopOpen && Boolean(anchorEl) // isPopOpen이 true가 되었는가 and 해당 html요소가 있는가? 둘다 참일경우 true
  const id = canBeOpen ? 'spring-popper' : undefined //만약 둘다 참이면 아이디에 spring-popper가 생김
  const [isRelease, setIsRelease] = useState(true)
  const [isMOdify, setIsModify] = useState(false)

  const dropdownSX = {
    padding: '6px',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
  }

  const STop = styled.div`
    display: flex;
    justify-content: space-between;
  `

  return (
    <>
      <Button
        disabled={false}
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          width: '120px',
          background: '#FFD400',
          '&:hover': { background: '#DDDDDD' },
        }}
        size="large"
        variant="contained"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          /*클릭 했을 때*/
          setAnchorEl(
            event.currentTarget,
          ) /*지금 클릭된 버튼을 anchorEl에 저장함*/
          setIsPopOpen(
            (prev) => !prev,
          ) /*isPopOpen은 팝업창을 열림, 닫음을 결정함, 이전값이 열림이면 닫힘으로, 닫힘이면 열림으로*/
        }}
      >
        방내놓기
      </Button>
      <Popover /*로그인 버튼 클릭 시 나오는 팝업 mui*/
        sx={{ marginTop: '12px' }}
        id={id} /*해당 팝업의 아이디*/
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
        <Box sx={dropdownSX}>
          <STop>
            <div>
              방을 내놓으시겠습니까?
              <Switch
                checked={isRelease}
                onChange={() => {
                  setIsRelease((prev) => !prev)
                }}
              />
            </div>
            {isRelease === true ? (
              isMOdify === true ? (
                <button
                  onClick={() => {
                    setIsModify(false)
                  }}
                >
                  저장
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsModify(true)
                  }}
                >
                  수정
                </button>
              )
            ) : null}
          </STop>
          {isRelease === true ? (
            isMOdify === true ? (
              <ReleaseRoomModify />
            ) : (
              <ReleaseRoomTrue />
            )
          ) : null}
        </Box>
      </Popover>
    </>
  )
}

export default ReleaseRoom

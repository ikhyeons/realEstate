import React, { useState } from 'react'

import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useNavigate } from 'react-router-dom'

const LoginBtnSX = {
  fontSize: '18px',
  fontWeight: 'bold',
  width: '260px',
  background: '#FFD400',
  '&:hover': { background: '#DDDDDD' },
}

const HeaderRightLoginFalse: React.FC = () => {
  const navigate = useNavigate() /*react route dom url바꿔주는 함수*/
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const canBeOpen = isPopOpen && Boolean(anchorEl) // isPopOpen이 true가 되었는가 and 해당 html요소가 있는가? 둘다 참일경우 true
  const id = canBeOpen ? 'spring-popper' : undefined //만약 둘다 참이면 아이디에 spring-popper가 생김

  return (
    <>
      <Button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          /*클릭 했을 때*/
          setAnchorEl(
            event.currentTarget,
          ) /*지금 클릭된 버튼을 anchorEl에 저장함*/
          setIsPopOpen(
            (prev) => !prev,
          ) /*isPopOpen은 팝업창을 열림, 닫음을 결정함, 이전값이 열림이면 닫힘으로, 닫힘이면 열림으로*/
        }}
        disabled={false}
        sx={LoginBtnSX}
        size="large"
        endIcon={<SendIcon />} /*버튼에 같이 들어가는 아이콘*/
        variant="contained"
      >
        로그인
      </Button>

      {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 팝업 부분ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
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
        <Box sx={{ padding: '6px', width: '235px' }}>
          <TextField
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                /*만약 포커싱 상태에서 엔터가 눌리면 fetch 함*/
                console.log('Enter on Em')
              }
            }}
            sx={{ marginBottom: '6px' }}
            id="outlined-basic"
            label="E-mail"
            type={'email'}
            variant="outlined"
          />
          <TextField
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                /*만약 포커싱 상태에서 엔터가 눌리면 fetch 함*/
                console.log('Enter on Pwd')
              }
            }}
            sx={{ marginBottom: '6px' }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={'password'}
          />
          <Button
            onClick={() => setIsPopOpen(false)} /*로그인 시 박스 닫기*/
            sx={{
              background: '#FFf4c0',
              '&:hover': { background: '#F0f4d0' },
            }}
          >
            로그인
          </Button>
          <Button onClick={() => navigate('/join') /*회원가입 페이지로 이동*/}>
            회원가입
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default HeaderRightLoginFalse

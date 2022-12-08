import styled from 'styled-components'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { useNavigate } from 'react-router-dom'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import { useState } from 'react'
import TextField from '@mui/material/TextField'

const SHeader = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 3;
  width: 100vw;
  height: 7vh;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(45deg, #ffdf65, #f0d060);
`

const SHeaderLeft = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
`

const SHeaderRight = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-around;
`

const Header: React.FC = () => {
  const navigate = useNavigate() /*react route dom url바꿔주는 함수*/
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const canBeOpen = isPopOpen && Boolean(anchorEl) // isPopOpen이 true가 되었는가 and 해당 html요소가 있는가? 둘다 참일경우 true
  const id = canBeOpen ? 'spring-popper' : undefined //만약 둘다 참이면 아이디에 spring-popper가 생김

  return (
    <SHeader>
      <SHeaderLeft>
        <Button /*mui 버튼*/
          onClick={() => {
            /*클릭했을 때 메인 지도화면으로 이동*/
            navigate('/')
          }}
          disabled={false} /*버튼 작동, 미작동 설정*/
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            width: '120px',
            background: 'none',
            '&:hover': { background: 'none' },
          }}
          size="large"
          variant="contained" /*버튼 모양 결정*/
        >
          지도보기
        </Button>
      </SHeaderLeft>
      <SHeaderRight>
        <Button
          onClick={() => {
            navigate('/community')
          }}
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
        >
          커뮤니티
        </Button>
        <Button
          onClick={() => {
            navigate('/room')
          }}
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
        >
          방내놓기
        </Button>
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
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            width: '130px',
            background: '#FFD400',
            '&:hover': { background: '#DDDDDD' },
          }}
          size="large"
          endIcon={<SendIcon />} /*버튼에 같이 들어가는 아이콘*/
          variant="contained"
        >
          로그인
        </Button>
      </SHeaderRight>
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
    </SHeader>
  )
}

export default Header

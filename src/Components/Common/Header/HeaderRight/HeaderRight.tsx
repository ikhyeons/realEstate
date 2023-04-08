import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Button from '@mui/material/Button'

import HeaderRightOnLogin from './HeaderRightOnLogin'
import HeaderRightLoginFalse from './HeaderRightLoginFalse'

const HeaderRight = () => {
  const navigate = useNavigate() /*react route dom url바꿔주는 함수*/
  const [cookies] = useCookies(['isLogin'])
  const [, setCookies] = useCookies(['lastPageNum'])

  return (
    <>
      <Button
        onClick={() => {
          navigate('/community/List/1')
          setCookies('lastPageNum', 1)
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
      {cookies.isLogin === 'true' ? (
        <HeaderRightOnLogin />
      ) : (
        <HeaderRightLoginFalse />
      )}
    </>
  )
}

export default HeaderRight

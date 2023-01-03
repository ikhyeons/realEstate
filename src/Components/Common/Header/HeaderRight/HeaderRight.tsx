import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'

import HeaderRightOnLogin from './HeaderRightOnLogin'
import HeaderRightLoginFalse from './HeaderRightLoginFalse'

const HeaderRight: React.FC = () => {
  const navigate = useNavigate() /*react route dom url바꿔주는 함수*/
  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <>
      <Button
        onClick={() => {
          navigate('/community/List')
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
      {isLogin == true ? <HeaderRightOnLogin /> : <HeaderRightLoginFalse />}
    </>
  )
}

export default HeaderRight

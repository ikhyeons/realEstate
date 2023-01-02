import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const HeaderLeft = () => {
  const navigate = useNavigate() /*react route dom url바꿔주는 함수*/

  return (
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
  )
}

export default HeaderLeft

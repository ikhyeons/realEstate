import styled from 'styled-components'
import AlarmBtn from './Alarm/AlarmBtn'

import ReleaseRoom from './ReleaseRoom/ReleaseRoom'

const SLoginedDiv = styled.div`
  width: 260px;
  display: flex;
`

const SProfile = styled.div`
  border-radius: 50%;
  width: 50px;
  background: lightyellow;
  margin: 0 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
`

const HeaderRightOnLogin: React.FC = () => {
  return (
    <SLoginedDiv>
      <ReleaseRoom />
      <AlarmBtn />
      <SProfile>성</SProfile>
    </SLoginedDiv>
  )
}

export default HeaderRightOnLogin

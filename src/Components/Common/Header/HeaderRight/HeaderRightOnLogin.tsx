import styled from 'styled-components'
import AlarmBtn from './Alarm/AlarmBtn'
import ProfileBtn from './Profile/ProfileBtn'
import ReleaseRoom from './ReleaseRoom/ReleaseRoom'

const SLoginedDiv = styled.div`
  width: 260px;
  display: flex;
`

const HeaderRightOnLogin: React.FC = () => {
  return (
    <SLoginedDiv>
      <ReleaseRoom />
      <AlarmBtn />
      <ProfileBtn />
    </SLoginedDiv>
  )
}

export default HeaderRightOnLogin

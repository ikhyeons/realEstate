import styled from 'styled-components'

import { HiBellAlert } from 'react-icons/hi2'
import ReleaseRoom from './ReleaseRoom/ReleaseRoom'

const SLoginedDiv = styled.div`
  width: 260px;
  display: flex;
`

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

const SAlarmNumber = styled.div`
  font-weight: normal;
`

const HeaderRightOnLogin: React.FC = () => {
  return (
    <SLoginedDiv>
      <ReleaseRoom />
      <SAlarm>
        <HiBellAlert
          style={{ transform: 'translate(0, 5px)', fontSize: '20px' }}
        />
        <SAlarmNumber>99</SAlarmNumber>
      </SAlarm>
      <SProfile>성</SProfile>
    </SLoginedDiv>
  )
}

export default HeaderRightOnLogin

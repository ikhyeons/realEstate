import styled from 'styled-components'
import AlarmBtn from './Alarm/AlarmBtn'
import ProfileBtn from './Profile/ProfileBtn'
import ReleaseRoom from './ReleaseRoom/ReleaseRoom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Port from '../../../../../port'
const SLoginedDiv = styled.div`
  width: 270px;
  display: flex;
`

const HeaderRightOnLogin: React.FC = () => {
  const { status, error, data } = useQuery(
    ['readUserInfo'],
    () => {
      return axios.get(`http://${Port}/user/readUserInfo/`, {
        withCredentials: true,
      })
    },
    {
      onSuccess: (data: any) => {
        console.log(data)
      },
    },
  )

  return (
    <SLoginedDiv>
      <ReleaseRoom />
      <AlarmBtn />
      <ProfileBtn />
    </SLoginedDiv>
  )
}

export default HeaderRightOnLogin

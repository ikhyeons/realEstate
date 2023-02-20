import styled from 'styled-components'
import AlarmBtn from './Alarm/AlarmBtn'
import ProfileBtn from './Profile/ProfileBtn'
import ReleaseRoom from './ReleaseRoom/ReleaseRoom'
import { useQuery } from 'react-query'
import axios from 'axios'
const SLoginedDiv = styled.div`
  width: 260px;
  display: flex;
`

const HeaderRightOnLogin: React.FC = () => {
  const { status, error, data } = useQuery(
    ['readUserInfo'],
    () => {
      return axios.get(`http://localhost:3001/user/readUserInfo/`, {
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

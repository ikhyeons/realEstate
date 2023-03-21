import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const SAlarmCard = styled.li`
  padding: 5px;
  border-radius: 4px;
  background: #eee;
  position: relative;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
`
const SAlarmCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const SAlarmCardDocTitle = styled.div`
  font-weight: bold;
  width: 72%;
`

const SAlarmCardDate = styled.div`
  margin-left: 20px;
  font-size: 13px;
  width: 28%;
`
const SAlarmCardContent = styled.div`
  margin-left: 10px;
`
const SAlarmCardNum = styled.div`
  text-align: center;
  width: 30px;
  height: 30px;
  background: yellow;
  border-radius: 50%;
  border: 1px solid black;
  padding: 2px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`

const AlarmDocCard = (prop: any) => {
  const navigate = useNavigate()

  return (
    <SAlarmCard
      onClick={() => {
        prop.refetch()
        navigate(`/community/View/${prop.data.docNum}`)
      }}
    >
      <SAlarmCardHeader>
        <SAlarmCardDocTitle>{prop.data.docTitle}</SAlarmCardDocTitle>
        <SAlarmCardDate>
          {prop.data.makeDate.slice(2, 4) +
            '.' +
            prop.data.makeDate.slice(5, 7) +
            '.' +
            prop.data.makeDate.slice(8, 10) +
            ' ' +
            prop.data.makeDate.slice(11, 13) +
            '시 ' +
            prop.data.makeDate.slice(14, 16) +
            '분'}
        </SAlarmCardDate>
      </SAlarmCardHeader>

      <SAlarmCardContent>{prop.data.replyContent}</SAlarmCardContent>
      <SAlarmCardNum>{prop.data.cnt}</SAlarmCardNum>
    </SAlarmCard>
  )
}

export default AlarmDocCard

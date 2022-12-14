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
`
const SAlarmCardName = styled.div`
  border-radius: 50%;
  background: yellow;
  padding: 2px;
  font-size: 20px;
  width: 30px;
  height: 30px;
  text-align: center;
  margin-right: 10px;
`
const SAlarmCardDocTitle = styled.div``

const SAlarmCardDate = styled.div`
  margin-left: 20px;
  font-size: 13px;
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

const AlarmDocCard = () => {
  return (
    <SAlarmCard>
      <SAlarmCardHeader>
        <SAlarmCardName>성</SAlarmCardName>
        <SAlarmCardDocTitle>글 제목</SAlarmCardDocTitle>
      </SAlarmCardHeader>
      <SAlarmCardDate>23. 1. 4 오후 6시 9분</SAlarmCardDate>
      <SAlarmCardContent>달린 댓글 내용</SAlarmCardContent>
      <SAlarmCardNum>99</SAlarmCardNum>
    </SAlarmCard>
  )
}

export default AlarmDocCard

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SDocHeader = styled.div`
  height: 30px;
`

const SDocListBtn = styled.button`
  width: 70px;
  height: 30px;
  background: none;
  margin-bottom: 5px;
`

const SViewMain = styled.div`
  padding: 5px;
  position: relative;
`

const STitle = styled.input`
  font-weight: bold;
  font-size: 20px;
  margin: 5px;
  width: 100%;
  height: 40px;
  padding: 5px;
`

const SContent = styled.textarea`
  padding: 5px;
  font-size: 17px;
  min-height: 500px;
  margin: 5px;
  width: 100%;
`

const SCompleteBtn = styled.button`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 0px;
`

const DocWrite = () => {
  const navigate = useNavigate()
  return (
    <SViewMain>
      <SDocHeader>
        <SDocListBtn
          onClick={() => {
            navigate('/community/List')
          }}
        >
          ←글목록
        </SDocListBtn>
      </SDocHeader>
      <STitle />
      <hr />
      <SContent />
      <SCompleteBtn
        onClick={() => {
          navigate('/community/View')
        }}
      >
        작성완료!
      </SCompleteBtn>
    </SViewMain>
  )
}

export default DocWrite

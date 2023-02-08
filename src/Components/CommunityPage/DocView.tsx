import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import RippleMain from './Ripple/RippleMain'
import { useCookies } from 'react-cookie'

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
`

const STitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 3px;
`

const SDate = styled.span`
  margin-right: 5px;
  margin-left: 5px;
  font-size: 15px;
`

const SContent = styled.div`
  padding: 5px;
  font-size: 17px;
  min-height: 500px;
`

const SWriter = styled.span``

const DocView = () => {
  const [cookies, setCookies] = useCookies(['lastPageNum'])
  console.log(cookies)
  const navigate = useNavigate()
  return (
    <SViewMain>
      <SDocHeader>
        <SDocListBtn
          onClick={() => {
            navigate(`/community/List/${Number(cookies.lastPageNum)}`)
          }}
        >
          ←글목록
        </SDocListBtn>
      </SDocHeader>
      <STitle>문서의 제목입니다.</STitle>
      <SDate>2023.01.01</SDate>
      <SWriter>성익현</SWriter>
      <hr />
      <SContent>게시글 내용입니다.</SContent>
      <hr />
      <RippleMain /> {/* 댓글 컴포넌트 */}
    </SViewMain>
  )
}

export default DocView

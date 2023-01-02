import styled from 'styled-components'

const SOl = styled.ol`
  width: 100%;
`

const SLi = styled.li`
  list-style: none;
  display: flex;
  width: 100%;
  margin: 7px 0;
`

const STag = styled.div`
  display: flex;
  width: 100%;
`

const SNum = styled.span`
  width: 0px;
  flex-grow: 0.6;
  text-align: center;
  border-right: 1px solid black;
`
const STagTitle = styled.span`
  width: 0px;
  flex-grow: 5.07;
  text-align: center;
`

const STitle = styled.span`
  width: 0px;
  flex-grow: 5;
  padding-left: 10px;
`
const SDate = styled.span`
  width: 0px;
  flex-grow: 0.8;
  text-align: center;
  border-left: 1px solid black;
`
const SWriter = styled.span`
  width: 0px;
  flex-grow: 0.8;
  text-align: center;
`
const SView = styled.span`
  width: 0px;
  flex-grow: 0.8;
  text-align: center;
`

const DocList: React.FC = () => {
  return (
    <>
      <STag>
        <SNum>글번호</SNum>
        <STagTitle>제목</STagTitle>
        <SDate>날짜</SDate>
        <SWriter>작성자</SWriter>
        <SView>조회수</SView>
      </STag>
      <hr style={{ margin: '5px 0' }} />
      <SOl>
        <SLi>
          <SNum>1</SNum>
          <STitle>적당한 글 제목1</STitle>
          <SDate>22.12.29</SDate>
          <SWriter>성익현</SWriter>
          <SView>9999</SView>
        </SLi>
        <SLi>
          <SNum>2</SNum>
          <STitle>적당한 글 제목2</STitle>
          <SDate>22.12.29</SDate>
          <SWriter>성익현</SWriter>
          <SView>9999</SView>
        </SLi>
        <SLi>
          <SNum>3</SNum>
          <STitle>적당한 글 제목3</STitle>
          <SDate>22.12.29</SDate>
          <SWriter>성익현</SWriter>
          <SView>9999</SView>
        </SLi>
        <SLi>
          <SNum>4</SNum>
          <STitle>적당한 글 제목4</STitle>
          <SDate>22.12.29</SDate>
          <SWriter>성익현</SWriter>
          <SView>9999</SView>
        </SLi>
      </SOl>
    </>
  )
}

export default DocList

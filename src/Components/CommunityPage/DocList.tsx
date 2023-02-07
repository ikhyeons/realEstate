import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueries } from 'react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SOl = styled.ol`
  width: 100%;
  position: relative;
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
  min-width: 50px;
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
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
const SDate = styled.span`
  width: 0px;
  flex-grow: 0.8;
  text-align: center;
  border-left: 1px solid black;
  position: relative;
`

const SWriteBtn = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
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
const SpageNumBar = styled.div`
  display: flex;
  margin: 0 auto;
  width: 230px;
  justify-content: center;
`

const SpageNum = styled.span`
  list-style: none;
  text-align: center;
  width: 23px;
  padding: 5px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const DocList: React.FC = () => {
  const navigate = useNavigate()
  const { pageNum } = useParams()
  const [pageNums, setPageNums] = useState<string[]>([])

  const res = useQueries([
    {
      queryKey: ['readDocList', pageNum],
      queryFn: () =>
        axios.get(`http://localhost:3001/document/readDocList/${pageNum}`),
      onSuccess: (data: any) => {
        console.log(data.data)
      },
    },
    {
      queryKey: ['readDocCount', pageNum],
      queryFn: () => axios.get(`http://localhost:3001/document/readDocCount/`),
      onSuccess: (data: any) => {
        console.log(Math.ceil(Number(data.data.data) / 13))
        setPageNums(() => {
          const pageCountLengthArray = new Array(0)
          for (let i = 1; i <= Math.ceil(Number(data.data.data) / 0.1); i++)
            pageCountLengthArray.push(i)
          return pageCountLengthArray
        })
      },
    },
  ])
  useEffect(() => {
    console.log(pageNum)
  }, [pageNums])
  console.log(res[0], res[1].data)

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
          <STitle
            onClick={() => {
              navigate('/community/View')
            }}
          >
            적당한 글 제목1
          </STitle>
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
      <SpageNumBar>
        {pageNums.map((data, i) =>
          Number(data) === Number(pageNum) ? (
            <SpageNum
              style={{ fontWeight: 'bold' }}
              key={i}
              onClick={() => {
                navigate(`/community/List/${data}`)
              }}
            >
              {data}
            </SpageNum>
          ) : (
            <SpageNum
              key={i}
              onClick={() => {
                navigate(`/community/List/${data}`)
              }}
            >
              {data}
            </SpageNum>
          ),
        )}
      </SpageNumBar>
      <SWriteBtn
        onClick={() => {
          navigate(`/community/Write`)
        }}
      >
        글쓰기
      </SWriteBtn>
    </>
  )
}

export default DocList

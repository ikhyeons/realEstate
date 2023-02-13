import styled from 'styled-components'
import { Routes, useNavigate, useParams, Route } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PageNavigationBar from './PageNavigationBar'
import { useCookies } from 'react-cookie'

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
  flex-grow: 1.3;
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

const DocList: React.FC = () => {
  const navigate = useNavigate()
  const { pageNum } = useParams()
  const [c, s, r] = useCookies(['lastPageNum'])

  const [docList, setDocList] = useState([
    { docNum: '', docTitle: '', makeDate: '', userName: '', view: '' },
  ])
  const { status, data, error, refetch } = useQuery(
    ['readDocList', pageNum],
    async () => {
      if (!pageNum || Number(pageNum) === 0)
        return await axios.get(`http://localhost:3001/document/readDocList/1`)
      return await axios.get(
        `http://localhost:3001/document/readDocList/${pageNum}`,
      )
    },
    {
      onSuccess: (data: any) => {
        const modifyedData = data.data.data[0].map((data: any, i: number) => {
          return {
            ...data,
            makeDate:
              data.makeDate.slice(2, 4) +
              '.' +
              data.makeDate.slice(5, 7) +
              '.' +
              data.makeDate.slice(8, 10) +
              ' ' +
              data.makeDate.slice(11, 13) +
              ':' +
              data.makeDate.slice(14, 16),
          }
        })
        setDocList(modifyedData)
      },
    },
  )

  const countView = useMutation((docNum: string) =>
    axios.post(`http://localhost:3001/document/countView`, {
      docNum: docNum,
    }),
  )

  useEffect(() => {
    s('lastPageNum', pageNum)
  }, [pageNum])

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
        {docList.map((data, i) => (
          <SLi key={i}>
            <SNum>{data.docNum}</SNum>
            <STitle
              onClick={() => {
                countView.mutate(data.docNum)
                navigate(`/community/View/${data.docNum}`)
              }}
            >
              {data.docTitle}
            </STitle>
            <SDate>{data.makeDate}</SDate>
            <SWriter>{data.userName}</SWriter>
            <SView>{data.view}</SView>
          </SLi>
        ))}
      </SOl>
      <PageNavigationBar />
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

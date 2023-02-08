import styled from 'styled-components'
import { Routes, useNavigate, useParams, Route } from 'react-router-dom'
import { useQuery, useQueries } from 'react-query'
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

const DocList: React.FC = () => {
  const navigate = useNavigate()
  const { pageNum } = useParams()
  const [c, s, r] = useCookies(['lastPageNum'])

  const { status, data, error, refetch } = useQuery(
    ['readDocList', pageNum],
    () => axios.get(`http://localhost:3001/document/readDocList/${pageNum}`),
    {
      onSuccess: (data: any) => {},
    },
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
        <SLi>
          <SNum>1</SNum>
          <STitle
            onClick={() => {
              navigate('/community/View/1')
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

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useCookies } from 'react-cookie'

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

const getNavigater10 = (pageNum: number, NumOfPageNum: number) => {
  if (pageNum) {
    if (NumOfPageNum < 10) {
      console.log('페이지 넘이 있고 총 페이지가 10보다 작을 경우')
      const newArray: number[] = []
      for (let i = 1; i <= NumOfPageNum; i++) {
        newArray.push(i)
      }
      return newArray
    } else {
      if (Number(pageNum) >= NumOfPageNum - 5) {
        console.log('페이지 넘이 있고 거의 마지막에 다다랐을 경우')
        return [
          NumOfPageNum - 9,
          NumOfPageNum - 8,
          NumOfPageNum - 7,
          NumOfPageNum - 6,
          NumOfPageNum - 5,
          NumOfPageNum - 4,
          NumOfPageNum - 3,
          NumOfPageNum - 2,
          NumOfPageNum - 1,
          NumOfPageNum,
        ]
      } else {
        if (Number(pageNum) < 5) {
          console.log(
            '페이지 넘이 있고 일반적인 경우 현재 페이지가 5보다 작을 때',
          )
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        } else
          console.log(
            '페이지 넘이 있고 일반적인 경우 현재 페이지가 5보다 클 때',
          )
        return [
          Number(pageNum) - 4,
          Number(pageNum) - 3,
          Number(pageNum) - 2,
          Number(pageNum) - 1,
          Number(pageNum),
          Number(pageNum) + 1,
          Number(pageNum) + 2,
          Number(pageNum) + 3,
          Number(pageNum) + 4,
          Number(pageNum) + 5,
        ]
      }
    }
  } else {
    if (NumOfPageNum < 10) {
      console.log('페이지 넘이 없고 총 페이지가 10보다 작을 경우')
      const newArray: number[] = []
      for (let i = 1; i <= NumOfPageNum; i++) {
        newArray.push(i)
      }
      return newArray
    } else {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}

const PageNavigationBar = () => {
  const { pageNum } = useParams()
  const navigate = useNavigate()
  const [page10, setPage10] = useState<number[]>([])
  const [cookies, setCookies] = useCookies(['lastPageNum'])

  const { status, data, error, refetch } = useQuery(
    ['readDocCount', pageNum],
    async () => axios.get(`http://localhost:3001/document/readDocCount/`),
    {
      onSuccess: (data: any) => {
        const pageNumber = Math.ceil(Number(data.data.data) / 28) // 총 페이지 수
        setPage10(() => getNavigater10(Number(pageNum), Number(pageNumber)))
      },
    },
  )

  return (
    <SpageNumBar>
      {page10.map((mapPageNumber, i) =>
        Number(mapPageNumber) === Number(pageNum) ? (
          <SpageNum
            key={i}
            style={{ fontWeight: 'bold', color: 'black' }}
            onClick={() => {
              navigate(`/community/List/${mapPageNumber}`)
              setCookies('lastPageNum', mapPageNumber)
            }}
          >
            {mapPageNumber}
          </SpageNum>
        ) : (
          <SpageNum
            key={i}
            onClick={() => {
              navigate(`/community/List/${mapPageNumber}`)
              setCookies('lastPageNum', mapPageNumber)
            }}
          >
            {mapPageNumber}
          </SpageNum>
        ),
      )}
    </SpageNumBar>
  )
}

export default PageNavigationBar

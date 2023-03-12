import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import Port from '../../../../port'
import { useParams } from 'react-router-dom'
import ReplyCard from './ReplyCard'

const SRipleMain = styled.div`
  padding: 5px;
`
const SwriteRipple = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 17px;
  padding: 4px;
  font-family: none;
`

const RippleMain = () => {
  const { docNum } = useParams()
  const [replyValue, setReplyValue] = useState<string>('')

  const readReply = useQuery(
    ['readReply', docNum],
    () => {
      return axios.get(`http://${Port}/reply/readReply/${docNum}`)
    },
    {
      onSuccess: (data: any) => {},
    },
  )

  const queryClient = useQueryClient() // 등록된 quieryClient 가져오기

  const writeReply = useMutation(
    () =>
      axios.post(
        `http://${Port}/reply/createReply`,
        {
          docNum: docNum,
          content: replyValue,
        },
        { withCredentials: true },
      ),
    {
      onSuccess: (data) => {
        if (data.data.result === 1) alert('로그인부터 하세요;')
        queryClient.invalidateQueries(['readReply', docNum]) // queryKey 유효성 제거
      },
    },
  )

  const boxref = useRef<HTMLTextAreaElement>(null)

  return (
    <>
      <b>댓글</b>
      <SRipleMain>
        <SwriteRipple
          ref={boxref}
          rows={2}
          value={replyValue}
          onChange={(e) => {
            boxref.current!.style.height = 'auto'
            boxref.current!.style.height = boxref.current?.scrollHeight + 'px'
            setReplyValue(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.shiftKey !== true && e.code === 'Enter') {
              if (replyValue !== '') {
                e.preventDefault()
                boxref.current!.style.height = 'auto'
                setReplyValue('')
                writeReply.mutate()
              } else alert('공백은 입력할 수 없습니다.')
            }
          }}
        />
        {readReply.data?.data.data.map((data: any, i: number) => (
          <ReplyCard key={i} data={data} />
        ))}
      </SRipleMain>
    </>
  )
}

export default RippleMain

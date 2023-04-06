import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import Port from '../../../../port'
import { useParams } from 'react-router-dom'
import ReplyCard from './ReplyCard'
import { useRecoilState } from 'recoil'
import { AreplySocket } from '../../../AtomStorage'

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

interface IPropDocValue {
  data: DocValue
}
const RippleMain = (prop: IPropDocValue) => {
  const [replySocket] = useRecoilState(AreplySocket)
  const { docNum } = useParams()
  const [replyValue, setReplyValue] = useState<string>('')

  const readReply = useQuery<IReplys>(['readReply', docNum], () =>
    axios.get(`http://${Port}/reply/readReply/${docNum}`),
  )

  const queryClient = useQueryClient() // 등록된 quieryClient 가져오기

  const writeReply = useMutation<mutationData>(
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
        else replySocket()?.emit('createReply', prop.data.docWriter)
        queryClient.invalidateQueries(['readReply', docNum]) // queryKey 유효성 제거
      },
      onSettled: () => {
        replySocket()?.emit('writeReply', {
          docNum: docNum,
          data: replyValue,
        })
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
        <button
          onClick={(e) => {
            if (replyValue !== '') {
              e.preventDefault()
              boxref.current!.style.height = 'auto'
              setReplyValue('')
              writeReply.mutate()
            } else alert('공백은 입력할 수 없습니다.')
          }}
        >
          제출
        </button>
        {readReply.data?.data.data.map((data, i) => (
          <ReplyCard key={i} data={data} />
        ))}
      </SRipleMain>
    </>
  )
}

export default RippleMain

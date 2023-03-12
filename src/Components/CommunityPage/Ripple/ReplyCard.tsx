import styled from 'styled-components'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import Port from '../../../../port'
import { useParams } from 'react-router-dom'
import { useState, useRef } from 'react'
import useBindClickOutside from '../../../Hooks/bindOutSide'

const SRippleCard = styled.div`
  background: lightgray;
  border-bottom: 1px solid black;
  margin-bottom: 3px;
`

const SwriteRipple = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 17px;
  padding: 4px;
  font-family: none;
`

const SRippleInfo = styled.div``
const SRippleWriter = styled.span`
  margin-right: 5px;
`
const SRippleDate = styled.span`
  font-size: 13px;
`
const SRippleContent = styled.div`
  white-space: pre-wrap;
  padding: 2px 0 10px 10px;
`

const SRippleBtn = styled.span`
  margin-left: 5px;
  font-size: 13px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const ReplyCard = (data: any) => {
  const { docNum } = useParams()
  const queryClient = useQueryClient() // 등록된 quieryClient 가져오기
  const [modify, setModify] = useState<boolean>(false)
  const [modifyValue, setModifyValue] = useState<string>('')

  const boxref = useRef<HTMLTextAreaElement>(null)

  useBindClickOutside(boxref, () => {
    setModify(false)
  })

  const modifyReply = useMutation(
    () =>
      axios.post(
        `http://${Port}/reply/updateReply`,
        {
          repNum: data.data.repNum,
          content: modifyValue,
        },
        { withCredentials: true },
      ),
    {
      onSuccess: (data) => {
        if (data.data.result === 0) setModify(false)
        if (data.data.result === 1) alert('로그인부터 하세요;')
        else if (data.data.result === 2) alert('본인이 쓴 댓글이 아니잖아요;')
        queryClient.invalidateQueries(['readReply', docNum]) // queryKey 유효성 제거
      },
    },
  )

  const deleteReply = useMutation(
    (replyNum) =>
      axios.post(
        `http://${Port}/reply/deleteReply`,
        {
          repNum: replyNum,
        },
        { withCredentials: true },
      ),
    {
      onSuccess: (data) => {
        if (data.data.result === 1) alert('로그인부터 하세요;')
        else if (data.data.result === 2) alert('본인이 쓴 글이 아니잖아요;')
        else if (data.data.result === 3) alert('디비에서 뭔가 잘못됬습니다. ')
        queryClient.invalidateQueries(['readReply', docNum]) // queryKey 유효성 제거
      },
    },
  )

  return (
    <SRippleCard>
      <SRippleInfo>
        <SRippleWriter>{data.data.userName}</SRippleWriter>
        <SRippleDate>
          {data.data.makeDate?.slice(2, 4) +
            '.' +
            data.data.makeDate?.slice(5, 7) +
            '.' +
            data.data.makeDate?.slice(8, 10) +
            ' ' +
            data.data.makeDate?.slice(11, 13) +
            ':' +
            data.data.makeDate?.slice(14, 16)}
        </SRippleDate>
        <SRippleBtn
          onClick={() => {
            setModifyValue(data.data.replyContent)
            setModify(true)
          }}
        >
          수정
        </SRippleBtn>
        <SRippleBtn
          onClick={() => {
            deleteReply.mutate(data.data.repNum)
          }}
        >
          삭제
        </SRippleBtn>
      </SRippleInfo>
      {modify === false ? (
        <SRippleContent>{data.data.replyContent}</SRippleContent>
      ) : (
        <SwriteRipple
          ref={boxref}
          rows={2}
          value={modifyValue}
          onChange={(e) => {
            boxref.current!.style.height = 'auto'
            boxref.current!.style.height = boxref.current?.scrollHeight + 'px'
            setModifyValue(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.shiftKey !== true && e.code === 'Enter') {
              if (modifyValue !== '') {
                e.preventDefault()
                boxref.current!.style.height = 'auto'
                setModifyValue('')
                modifyReply.mutate()
              } else alert('공백은 입력할 수 없습니다.')
            }
          }}
        />
      )}
    </SRippleCard>
  )
}

export default ReplyCard

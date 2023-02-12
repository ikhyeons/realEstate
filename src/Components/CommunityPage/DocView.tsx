import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import RippleMain from './Ripple/RippleMain'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useQuery, useQueries } from 'react-query'

import { Viewer } from '@toast-ui/react-editor'
import { useEffect, useState } from 'react'
import DocModify from './DocModify'
import { useRecoilState } from 'recoil'
import { AdocValue, AisModify } from '../../AtomStorage'

const SDocHeader = styled.div`
  height: 30px;
`
const STitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const SModifyButton = styled.button`
  padding: 10px 20px;
`

const STieleBarLeft = styled.div`
  display: flex;
  align-items: end;
`

const STitleBarRight = styled.div`
  display: flex;
  align-items: end;
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
  font-size: 34px;
  align-items: end;
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

const SWriter = styled.span`
  font-weight: bold;
`

const DocView = () => {
  const [cookies, setCookies] = useCookies(['lastPageNum'])
  const { docNum } = useParams()
  const [docValue, setDocValue] = useRecoilState(AdocValue)
  const [isModify, setIsModify] = useRecoilState(AisModify)
  const navigate = useNavigate()

  const res = useQueries([
    {
      queryKey: ['readDoc', docNum],
      queryFn: () => {
        return axios.get(`http://localhost:3001/document/readDoc/${docNum}`)
      },
      onSuccess: (data: any) => {
        setDocValue(data.data.data)
      },
    },
    {
      queryKey: ['deleteDoc'],
      queryFn: () => {
        return axios.post(
          `http://localhost:3001/document/deleteDoc`,
          {
            docNum: docNum,
          },
          { withCredentials: true },
        )
      },
      enabled: false,
      onSuccess: (data: any) => {
        if (data.data.result === 0) {
          navigate(`/community/List/${Number(cookies.lastPageNum)}`)
        }
        if (data.data.result === 2) {
          alert('당신은 작성자가 아닙니다.')
        }
      },
    },
  ])

  return isModify === false ? (
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
      <STitleBar>
        <STieleBarLeft>
          <STitle>{docValue.docTitle}</STitle>
          <SDate>
            {docValue.makeDate.slice(2, 4) +
              '.' +
              docValue.makeDate.slice(5, 7) +
              '.' +
              docValue.makeDate.slice(8, 10) +
              ' ' +
              docValue.makeDate.slice(11, 13) +
              ':' +
              docValue.makeDate.slice(14, 16)}
          </SDate>
          <SWriter>{docValue.userName}</SWriter>
        </STieleBarLeft>
        <STitleBarRight>
          <SModifyButton
            onClick={() => {
              setIsModify(true)
            }}
          >
            수정
          </SModifyButton>

          <SModifyButton
            onClick={() => {
              res[1].refetch()
            }}
          >
            삭제
          </SModifyButton>
        </STitleBarRight>
      </STitleBar>
      <hr />
      <SContent>
        {res[0].status === 'success' && (
          <Viewer
            initialValue={docValue.docContent}
            customHTMLRenderer={{
              htmlBlock: {
                iframe(node: any) {
                  return [
                    {
                      type: 'openTag',
                      tagName: 'iframe',
                      outerNewLine: true,
                      attributes: node.attrs,
                    },
                    { type: 'html', content: node.childrenHTML },
                    {
                      type: 'closeTag',
                      tagName: 'iframe',
                      outerNewLine: false,
                    },
                  ]
                },
              },
            }}
          />
        )}
      </SContent>
      <hr />
      <RippleMain /> {/* 댓글 컴포넌트 */}
    </SViewMain>
  ) : (
    <DocModify />
  )
}

export default DocView

import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import RippleMain from './Reply/ReplyMain'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Port from '../../../port'
import { useMutation, useQuery } from 'react-query'

import { Viewer } from '@toast-ui/react-editor'
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
  font-size: 28px;
  align-items: end;
  padding: 4px;
  transform: translateY(3px);
`

const SDate = styled.span`
  margin-right: 5px;
  margin-left: 5px;
  font-size: 15px;
`

const SContent = styled.div`
  padding: 5px;
  min-height: 650px;
`

const SWriter = styled.span`
  font-weight: bold;
`

const DocView = () => {
  const [cookies] = useCookies(['lastPageNum'])
  const { docNum } = useParams()
  const [docValue, setDocValue] = useRecoilState(AdocValue)
  const [isModify, setIsModify] = useRecoilState(AisModify)
  const navigate = useNavigate()

  const { status, error, data, refetch } = useQuery<readDocData>(
    ['readDoc', docNum],
    () =>
      axios.get(`http://${Port}/document/readDoc/${docNum}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        setDocValue(data.data.data)
      },
    },
  )

  const deleteDoc = useMutation<mutationData>(
    () =>
      axios.post(
        `http://${Port}/document/deleteDoc`,
        {
          docNum: docNum,
        },
        { withCredentials: true },
      ),
    {
      onSuccess: (data: any) => {
        if (data.data.result === 0) {
          navigate(`/community/List/${Number(cookies.lastPageNum)}`)
        }
        if (data.data.result === 2) {
          alert('당신은 작성자가 아닙니다.')
        }
      },
    },
  )

  return isModify === false ? (
    <SViewMain>
      <SDocHeader>
        <SDocListBtn
          onClick={() => {
            if (Number(cookies.lastPageNum))
              navigate(`/community/List/${Number(cookies.lastPageNum)}`)
            else navigate(`/community/List`)
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
              deleteDoc.mutate()
            }}
          >
            삭제
          </SModifyButton>
        </STitleBarRight>
      </STitleBar>
      <hr />
      <SContent>
        {status === 'success' && (
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
      <RippleMain data={docValue} /> {/* 댓글 컴포넌트 */}
    </SViewMain>
  ) : (
    <DocModify />
  )
}

export default DocView

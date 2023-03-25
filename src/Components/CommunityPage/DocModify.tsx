import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Port from '../../../port'
import { useQuery } from 'react-query'
import { Editor } from '@toast-ui/react-editor'
import { useCookies } from 'react-cookie'

import '@toast-ui/chart/dist/toastui-chart.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import chart from '@toast-ui/editor-plugin-chart'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'

import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { AdocValue, AisModify } from '../../AtomStorage'

const SDocHeader = styled.div`
  height: 30px;
`

const SDocListBtn = styled.button`
  width: 80px;
  height: 30px;
  background: none;
  margin-bottom: 5px;
`

const SViewMain = styled.div`
  padding: 5px;
  position: relative;
`

const STitle = styled.input`
  font-weight: bold;
  font-size: 28px;
  width: 100%;
  margin: 5px 0 10px 0;
  height: 40px;
  padding: 2px;
  font-family: none;
`

const SCompleteBtn = styled.button`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 0px;
`

const DocModify: React.FC = () => {
  const editorRef = useRef<Editor>(null)
  const navigate = useNavigate()
  const [docValue, setDocValue] = useRecoilState(AdocValue)
  const [isModify, setIsModify] = useRecoilState(AisModify)
  const [cookies, setCookies] = useCookies(['lastPageNum'])
  const [initialValue, setInitialValue] = useState<DocValue>()
  const [modifiedValue, setModifiedValue] = useState<DocValue>({
    docNum: null,
    docTitle: '',
    docContent: '',
    userName: '',
    makeDate: '',
    view: null,
    docWriter: '',
  })

  useEffect(() => {
    setModifiedValue(docValue)
    setInitialValue(docValue)
  }, [])

  const { status, data, error, refetch } = useQuery(
    'modifyDoc',
    () =>
      axios.post(
        `http://${Port}/document/updateDoc`,
        {
          docNum: docValue.docNum,
          docTitle: modifiedValue.docTitle,
          docContent: modifiedValue.docContent,
        },
        { withCredentials: true },
      ),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.result === 0) {
          setIsModify(false)
        } else if (data.data.result === 1) alert('로그인부터 해주세요...')
        else if (data.data.result === 2) {
          alert('작성자가 아니잖아요..')
          setDocValue(initialValue as DocValue)
          setIsModify(false)
        } else alert('DB오류')
      },
    },
  )

  return (
    <SViewMain>
      <SDocHeader>
        <SDocListBtn
          onClick={() => {
            setIsModify(false)
          }}
        >
          ←수정취소
        </SDocListBtn>
      </SDocHeader>
      <STitle
        value={modifiedValue.docTitle}
        placeholder="제목"
        onChange={(e) => {
          setModifiedValue((prev) => ({ ...prev, docTitle: e.target.value }))
        }}
      />
      <hr />
      <Editor
        ref={editorRef}
        placeholder={'내용을 입력하세요'}
        height="700px"
        initialEditType="wysiwyg"
        initialValue={docValue.docContent}
        useCommandShortcut={true}
        plugins={[tableMergedCell, colorSyntax, chart]}
        viewer={true}
        onChange={(e) => {
          setModifiedValue((prev) => ({
            ...prev,
            docContent: editorRef.current?.getInstance().getHTML() as string,
          }))
        }}
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
                { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
              ]
            },
          },
        }}
      />
      <SCompleteBtn
        onClick={() => {
          setDocValue((prev) => ({
            ...prev,
            docTitle: modifiedValue.docTitle,
            docContent: modifiedValue.docContent,
          }))
          if (
            modifiedValue.docTitle === '' ||
            modifiedValue.docContent === '' ||
            modifiedValue.docContent === '<p><br></p>'
          ) {
            alert('제목이나 내용은 공백이 될 수 없습니다.')
          } else {
            refetch()
          }
        }}
      >
        수정완료!
      </SCompleteBtn>
    </SViewMain>
  )
}

export default DocModify

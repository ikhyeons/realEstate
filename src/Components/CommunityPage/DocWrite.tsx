import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Editor } from '@toast-ui/react-editor'

import '@toast-ui/chart/dist/toastui-chart.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import chart from '@toast-ui/editor-plugin-chart'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'

import { useEffect, useRef, useState } from 'react'

const SDocHeader = styled.div`
  height: 30px;
`

const SDocListBtn = styled.button`
  width: 70px;
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
  font-size: 20px;
  width: 100%;
  margin: 5px 0;
  height: 40px;
  padding: 5px;
`

const SCompleteBtn = styled.button`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 0px;
`

interface IdocData {
  title: string
  content: string
}

const DocWrite = () => {
  const editorRef = useRef<Editor>(null)
  const navigate = useNavigate()
  const [docData, setDocData] = useState<IdocData>({ title: '', content: '' })

  const { status, data, error, refetch } = useQuery(
    'login',
    () =>
      axios.post(
        `http://localhost:3001/document/writeDoc`,
        {
          docData,
        },
        { withCredentials: true },
      ),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.data.result === 0) alert('입력 완료!')
        else if (data.data.result === 1) alert('로그인부터 해주세요...')
        else if (data.data.result === 2) alert('비밀번호 없음')
        else alert('DB오류')
      },
    },
  )

  return (
    <SViewMain>
      <SDocHeader>
        <SDocListBtn
          onClick={() => {
            navigate('/community/List/1')
          }}
        >
          ←글목록
        </SDocListBtn>
      </SDocHeader>
      <STitle
        value={docData.title}
        placeholder="제목"
        onChange={(e) => {
          setDocData((prev) => ({ ...prev, title: e.target.value }))
        }}
      />
      <hr />
      <Editor
        ref={editorRef}
        placeholder={'내용을 입력하세요'}
        height="700px"
        initialEditType="wysiwyg"
        initialValue={' '}
        useCommandShortcut={true}
        plugins={[tableMergedCell, colorSyntax, chart]}
        viewer={true}
        onChange={() => {
          setDocData((prev) => ({
            title: prev.title,
            content: editorRef.current?.getInstance().getHTML() as string,
          }))
        }}
      />
      <SCompleteBtn
        onClick={() => {
          refetch()
          navigate(`/community/View/${0}`)
        }}
      >
        작성완료!
      </SCompleteBtn>
    </SViewMain>
  )
}

export default DocWrite

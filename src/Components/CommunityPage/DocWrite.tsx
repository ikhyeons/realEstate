import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Editor } from '@toast-ui/react-editor'

import '@toast-ui/chart/dist/toastui-chart.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import chart from '@toast-ui/editor-plugin-chart'
import { useRef, useState } from 'react'

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

const DocWrite = () => {
  const editorRef = useRef<Editor>(null)
  const [editorInitialValue, setEditorInitialValue] = useState('')
  const navigate = useNavigate()
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
      <STitle placeholder="제목" />
      <hr />
      <Editor
        ref={editorRef}
        placeholder={'내용을 입력하세요'}
        height="700px"
        initialEditType="wysiwyg"
        initialValue={editorInitialValue}
        useCommandShortcut={true}
        plugins={[tableMergedCell, colorSyntax, chart]}
        viewer={true}
      />
      <SCompleteBtn
        onClick={() => {
          console.log(editorRef.current?.getInstance().getHTML())
          navigate(`/community/View/${0}`)
        }}
      >
        작성완료!
      </SCompleteBtn>
    </SViewMain>
  )
}

export default DocWrite

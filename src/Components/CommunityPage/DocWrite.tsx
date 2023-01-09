import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'

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
  const navigate = useNavigate()
  return (
    <SViewMain>
      <SDocHeader>
        <SDocListBtn
          onClick={() => {
            navigate('/community/List')
          }}
        >
          ←글목록
        </SDocListBtn>
      </SDocHeader>
      <STitle placeholder="제목" />
      <hr />
      <Editor
        height="700px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
      <SCompleteBtn
        onClick={() => {
          navigate('/community/View')
        }}
      >
        작성완료!
      </SCompleteBtn>
    </SViewMain>
  )
}

export default DocWrite

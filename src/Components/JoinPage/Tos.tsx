import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import { useRecoilState } from 'recoil'
import { AjoinPageNum } from '../../AtomStorage'
import Checkbox from '@mui/material/Checkbox'

const Sform = styled.form`
  position: relative;
  width: 1000px;
  height: 800px;
  background: #ffef87;
  padding: 20px;
  margin: 0 auto;
`

const Tos: React.FC = () => {
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useRecoilState<0 | 1>(AjoinPageNum)
  return (
    <Sform>
      <p>저장 정보 : 아이디, 비밀번호, 주소</p>
      <p>아이디, 비밀번호 : 로그인 정보 저장</p>
      <p>주소 : 맵 기본 렌더링 위치 저장하는데 이용</p>
      <p>
        올리는 글, 사진 등은 모두 개발자가 볼 수 있음(서버가 개발자컴이라
        개발자컴에 저장됩니다.)
      </p>
      <p>건전한 데이터만 올려주세요.</p>
      <p>해당 정보를 제공하는데 동의?</p>
      동의
      <Checkbox
        onChange={(e) => {
          setIsCheck(e.target.checked)
        }}
        required
      />
      <Button
        onClick={(e) => {
          if (isCheck === true) {
            setCurrentPage(1)
          } else {
            alert('동의 체크하세요')
          }
        }}
        variant="contained"
      >
        다음
      </Button>
    </Sform>
  )
}

export default Tos

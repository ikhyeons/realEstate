import React from 'react'
import styled from 'styled-components'
import { Address, useDaumPostcodePopup } from 'react-daum-postcode'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { joinPageNum, joinValues } from '../../AtomStorage'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

const SForm = styled.form`
  position: relative;
  width: 1000px;
  height: 800px;
  background: #ffef87;
  padding: 20px;
  margin: 0 auto;
`

const InfoInputPage: React.FC = () => {
  const open = useDaumPostcodePopup()
  const navigate = useNavigate() /*react route dom url바꿔주는 함수*/
  const [currentPage, setCurrentPage] = useRecoilState<0 | 1>(joinPageNum)
  const [joinValue, setJoinValue] = useRecoilState<JoinValue>(joinValues)
  const resetJoinValue = useResetRecoilState(joinValues)

  const onCompleteF = (e: Address) => {
    setJoinValue((prev) => {
      return { ...prev, address: e.address, zonecode: e.zonecode }
    })
  }
  return (
    <SForm>
      <label htmlFor="email">이메일</label>
      <br />
      <TextField
        onChange={(e) => {
          setJoinValue((prev) => {
            let object = { ...prev, email: e.target.value }
            return object
          })
        }}
        value={joinValue.email}
        required
        sx={{ margin: '5px' }}
        id="email"
        type={'email'}
        label="E-mail"
        variant="outlined"
      />
      <br />
      <label htmlFor="password">비밀번호</label>
      <br />
      <TextField
        onChange={(e) => {
          setJoinValue((prev) => {
            let object = { ...prev, password: e.target.value }
            return object
          })
        }}
        value={joinValue.password}
        required
        sx={{ margin: '5px' }}
        id="password"
        type={'password'}
        label="Password"
        variant="outlined"
      />
      <br />
      <label htmlFor="address">주소</label>
      <Button
        onClick={() => {
          open({ onComplete: onCompleteF })
        }}
        sx={{ marginLeft: '10px' }}
        variant="contained"
      >
        주소찾기
      </Button>
      <br />
      <TextField
        required
        sx={{ width: '590px', margin: '5px' }}
        id="address"
        type={'text'}
        label="Address"
        variant="outlined"
        disabled
        value={joinValue.address}
      />
      <TextField
        required
        sx={{ width: '200px', margin: '5px' }}
        id="address"
        type={'text'}
        label="우편번호"
        variant="outlined"
        disabled
        value={joinValue.zonecode}
      />
      <br />
      상세 주소 입력
      <br />
      <TextField
        onChange={(e) => {
          setJoinValue((prev) => {
            let object = { ...prev, detail: e.target.value }
            return object
          })
        }}
        value={joinValue.detail}
        required
        sx={{ width: '800px', margin: '5px' }}
        id="address"
        type={'text'}
        label="Address"
        variant="outlined"
      />
      <Button
        sx={{
          fontSize: '25px',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '0 40px',
        }}
        variant="contained"
        onClick={(e) => {
          if (
            joinValue.email !== '' &&
            joinValue.password !== '' &&
            joinValue.address !== '' &&
            joinValue.detail !== '' &&
            joinValue.zonecode !== ''
          ) {
            navigate('/')
            setCurrentPage(0)
            resetJoinValue()
          } else {
            alert('빈 공간이 있습니다.')
          }
        }}
      >
        가입!
      </Button>
      <Button
        onClick={() => {
          setCurrentPage(0)
        }}
        sx={{
          color: '#222222',
          fontSize: '25px',
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '0 40px',
          background: '#DDDDDD',
          '&:hover': { background: '#D0D0D0' },
        }}
      >
        약관
      </Button>
    </SForm>
  )
}

export default InfoInputPage

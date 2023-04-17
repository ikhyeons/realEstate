import React, { useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import styled from 'styled-components'
import {
  AModifyData,
  AModifyStep,
  ARIsModify,
} from '../../../../../../AtomStorage'
import AddressSelect from './AddressSelect'
import Button from '@mui/material/Button'

const SInfoWrap = styled.div`
  display: flex;
`

const SInfoLeft = styled.div``

const SInfoRight = styled.div``

const SPayInput = styled.input`
  width: 80px;
  text-align: center;
  border: none;
  font-family: none;
  font-size: 24px;
  display: span;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const SSelect = styled.select`
  width: 80px;
  font-family: none;
  font-size: 24px;
  display: span;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const SInputWrap = styled.div`
  margin-bottom: 10px;
`

const SInputLabel = styled.label`
  width: 250px;
  font-size: 25px;
  display: block;
`

const SAddressInput = styled.input`
  width: 250px;
  border: none;
  font-family: none;
  font-size: 24px;
  display: span;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const SdelBtn = styled.span``

const Modify1 = () => {
  const nextPrevBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '5px',
    width: '78px',
    background: '#ee5',
    '&:hover': { background: '#dd2' },
  }
  const [, setIsModify] = useRecoilState(ARIsModify)
  const [, setModifyStep] = useRecoilState(AModifyStep)
  const [modifyData, setModifyData] = useRecoilState(AModifyData)
  const rstModifyData = useResetRecoilState(AModifyData)
  const now = new Date() // 현재 날짜 및 시간
  const year = now.getFullYear() // 연도
  const Month: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const Year: number[] = [
    year,
    year + 1,
    year + 2,
    year + 3,
    year + 4,
    year + 5,
    year + 6,
    year + 7,
    year + 8,
  ]
  const OptionList: string[] = [
    '',
    '원룸',
    '투룸',
    '세탁기',
    '가스레인지',
    '전자레인지',
    '침대',
    '싱크대',
  ]
  const [options, setOptions] = useState('')
  return (
    <>
      <hr />
      방 정보 입력
      <hr />
      <SInfoWrap>
        <SInfoLeft>
          <SInputWrap>
            <SInputLabel>가격</SInputLabel>
            <SPayInput
              placeholder="보증금"
              value={modifyData.deposit}
              onChange={(e) => {
                setModifyData((prev) => ({ ...prev, deposit: e.target.value }))
              }}
            />{' '}
            /{' '}
            <SPayInput
              placeholder="월세"
              value={modifyData.monthly}
              onChange={(e) => {
                setModifyData((prev) => ({ ...prev, monthly: e.target.value }))
              }}
            />
          </SInputWrap>
          <SInputWrap>
            <SInputLabel>기간</SInputLabel>
            <SSelect
              value={modifyData.startYear}
              onChange={(e) => {
                setModifyData((prev) => ({
                  ...prev,
                  startYear: e.target.value,
                }))
              }}
              name="startYear"
              id=""
            >
              <option>{''}</option>
              {Year.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </SSelect>
            <SSelect
              value={modifyData.startMonth}
              onChange={(e) => {
                setModifyData((prev) => ({
                  ...prev,
                  startMonth: e.target.value,
                }))
              }}
              name="startMonth"
              id=""
            >
              <option>{''}</option>
              {Month.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </SSelect>{' '}
          </SInputWrap>
          <SInputWrap>
            <SInputLabel>주소검색</SInputLabel>
            <AddressSelect />
          </SInputWrap>
          <SInputWrap>
            <SInputLabel>주소</SInputLabel>
            <SAddressInput
              value={modifyData.addressL.address}
              onChange={() => {}}
            />
          </SInputWrap>
          <SInputWrap>
            <SInputLabel>상세주소</SInputLabel>
            <SAddressInput
              value={modifyData.detailAddress}
              onChange={(e) => {
                setModifyData((prev) => ({
                  ...prev,
                  detailAddress: e.target.value,
                }))
              }}
            />
          </SInputWrap>
          <SInputWrap>
            <SInputLabel>옵션</SInputLabel>
            <SSelect
              value={options}
              onChange={(e) => {
                setOptions(e.target.value)
                if (e.target.value !== '')
                  setModifyData((prev) => {
                    if (!prev.selectedOption.includes(e.target.value))
                      return {
                        ...prev,
                        selectedOption: [
                          ...prev.selectedOption,
                          e.target.value,
                        ],
                      }
                    else return { ...prev }
                  })
              }}
              name="endMonth"
              id=""
            >
              {OptionList.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </SSelect>
          </SInputWrap>
          <SInputWrap>
            {modifyData.selectedOption.map((data, i) => (
              <span key={i}>
                {data}
                <SdelBtn
                  onClick={() => {
                    setModifyData((prev) => ({
                      ...prev,
                      selectedOption: prev.selectedOption.filter(
                        (data2) => data2 !== data,
                      ),
                    }))
                  }}
                >
                  x
                </SdelBtn>{' '}
              </span>
            ))}
          </SInputWrap>
        </SInfoLeft>
        <SInfoRight></SInfoRight>
      </SInfoWrap>
      <Button
        disabled={false} /*버튼 작동, 미작동 설정*/
        sx={nextPrevBtn}
        size="large"
        variant="contained" /*버튼 모양 결정*/
        onClick={() => {
          setIsModify(false)
          rstModifyData()
        }}
      >
        취소
      </Button>
      <Button
        disabled={false} /*버튼 작동, 미작동 설정*/
        sx={nextPrevBtn}
        size="large"
        variant="contained" /*버튼 모양 결정*/
        onClick={() => {
          setModifyStep('second')
        }}
      >
        다음
      </Button>
    </>
  )
}

export default Modify1

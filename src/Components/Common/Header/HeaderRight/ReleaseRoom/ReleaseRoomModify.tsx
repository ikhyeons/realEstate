import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const SInfoMain = styled.div`
  margin-top: 5px;
  margin-bottom: 2px;
  display: flex;
`
const SInfoLeft = styled.div`
  width: 40%;
  margin-right: 5px;
`
const SMainImg = styled.img`
  width: 100%;
`
const SInfoRight = styled.div`
  width: 60%;
`
const SPayInput = styled.input`
  width: 50px;
  border: none;
  font-family: none;
  font-size: 16px;
  display: span;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const SAddressInput = styled.input`
  width: 250px;
  border: none;
  font-family: none;
  font-size: 16px;
  display: span;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const Sinput = styled.input`
  border: none;
  font-family: none;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`
const SPictures = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`
const SPictureView = styled.img`
  height: 400px;
  width: 100%;
`
const SPictureLists = styled.ol`
  display: flex;
  height: 100px;
`
const SPictureList = styled.li`
  height: 100%;
  margin-right: 5px;
  list-style: none;
`
const SPictureAddbox = styled.li`
  height: 100%;
  margin-right: 5px;
  cursor: pointer;
  width: 130px;
  text-align: center;
  alitn-items: center;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SInnerPicture = styled.img`
  height: 100%;
`

const SContent = styled.textarea`
  resize: none;
  font-family: none;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

let now = new Date() // 현재 날짜 및 시간
let year = now.getFullYear() // 연도

const ReleaseRoomModify = () => {
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
    '세탁기',
    '가스레인지',
    '전자레인지',
    '침대',
    '싱크대',
  ]
  const [startYear, setStartYear] = useState('')
  const [startMonth, setStartMonth] = useState('')
  const [endYear, setEndYear] = useState('')
  const [endMonth, setEndMonth] = useState('')
  const [options, setOptions] = useState('')
  const [selectedOption, setSelectedOption] = useState<string[]>([])

  return (
    <>
      <hr />
      <SInfoMain>
        <SInfoLeft>
          <SMainImg src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
        </SInfoLeft>
        <SInfoRight>
          <div>
            가격 : <SPayInput placeholder="보증금" /> /{' '}
            <SPayInput placeholder="월세" />
          </div>
          <div>
            기간 :{' '}
            <select
              value={startYear}
              onChange={(e) => {
                setStartYear(e.target.value)
              }}
              name="startYear"
              id=""
            >
              {Year.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </select>
            <select
              value={startMonth}
              onChange={(e) => {
                setStartMonth(e.target.value)
              }}
              name="startMonth"
              id=""
            >
              {Month.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </select>{' '}
            ~{' '}
            <select
              value={endYear}
              onChange={(e) => {
                setEndYear(e.target.value)
              }}
              name="endYear"
              id=""
            >
              {Year.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </select>
            <select
              value={endMonth}
              onChange={(e) => {
                setEndMonth(e.target.value)
              }}
              name="endMonth"
              id=""
            >
              {Month.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </select>
          </div>
          <div>
            주소 : <SAddressInput />
          </div>
          <div>
            옵션 :{' '}
            <select
              value={options}
              onChange={(e) => {
                setOptions(e.target.value)
                if (e.target.value !== '')
                  setSelectedOption((prev) => [...prev, e.target.value])
              }}
              name="endMonth"
              id=""
            >
              {OptionList.map((data, i) => (
                <option key={i}>{data}</option>
              ))}
            </select>
          </div>
          <div>
            {selectedOption.map((data, i) => (
              <span key={i}>
                {data}
                <span>x</span>{' '}
              </span>
            ))}
          </div>
        </SInfoRight>
      </SInfoMain>
      <hr />
      <SPictures>
        <SPictureView src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
        <SPictureLists>
          <SPictureAddbox>
            <div>사진추가+</div>
          </SPictureAddbox>
          <SPictureList>
            <SInnerPicture src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
          </SPictureList>
          <SPictureList>
            <SInnerPicture src="https://cdn4.buysellads.net/uu/1/127574/1668535591-SStk2-1.jpg" />
          </SPictureList>
        </SPictureLists>
      </SPictures>
      <hr />
      <SContent placeholder="추가 내용" />
    </>
  )
}

export default ReleaseRoomModify

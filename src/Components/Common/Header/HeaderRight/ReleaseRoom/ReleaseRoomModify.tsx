import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useQueries, useMutation, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'
import { ARIsModify, AroomModifyAddressAndL } from '../../../../../AtomStorage'
import AddressSelect from './AddressSelect'

const Sform = styled.form``

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
  height: 160px;
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
  width: 100%;
  overflow-x: auto;
`
const SPictureList = styled.li`
  height: 95%;
  margin-right: 5px;
  list-style: none;
`
const SImageLabel = styled.label`
  height: 100%;
  margin-right: 5px;
  cursor: pointer;
  width: 130px;
  text-align: center;
  align-items: center;
  list-style: none;
  display: block;
  flex-direction: column;
  border: 1px solid black;
  justify-content: center;
`

const SImageInput = styled.input`
  display: none;
`

const SInnerPicture = styled.img`
  height: 100%;
  width: 130px;
`

const SContent = styled.textarea`
  resize: none;
  font-family: none;
  font-size: 16px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const SAddDiv = styled.div`
  position: relative;
`

const now = new Date() // 현재 날짜 및 시간
const year = now.getFullYear() // 연도

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
  const [startYear, setStartYear] = useState(String(year)) //시작년
  const [startMonth, setStartMonth] = useState('1') //시작월
  const [options, setOptions] = useState('')
  const [selectedOption, setSelectedOption] = useState<string[]>([]) // 선택된 옵션들
  const [formOutData, setFormOutData] = useState<FormData>()
  const [nowImage, setNowImage] = useState<string>('')
  const [inputImages, setInputImages] = useState<string[]>([])
  const [addressL, setAddress] = useRecoilState<any>(AroomModifyAddressAndL)
  const [detailAddress, setDetailAddress] = useState<string>('')
  const [deposit, setDeposit] = useState<string>('')
  const [monthly, setMonthly] = useState<string>('')
  const [doc, setDoc] = useState<string>('')
  const [isModify, setIsModify] = useRecoilState(ARIsModify)
  const queryClient = useQueryClient() // 등록된 quieryClient 가져오기
  const [imgSuccess, setImgSuccess] = useState(false)
  const [dataSuccess, setDataSuccess] = useState(false)

  const handleChangeFile = (e: any) => {
    if (e.target.files.length) {
      const form = new FormData()

      Array.from(e.target.files).map((data: any) => {
        form.append('inputImgs', data)

        console.log(data)
        let reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onloadend = () => {
          const resultImage: string = reader.result as string
          console.log(resultImage)
          setInputImages((prev) => {
            if (!inputImages.includes(resultImage)) {
              return [...prev, resultImage]
            } else {
              return [...prev]
            }
          })
        }
        setFormOutData(form)
      })
    }
  }

  const modifyRoomRelease = useMutation(
    () =>
      axios.post(
        'http://localhost:3001/releaseRoom/setRoomContent',
        {
          roomYear: startYear,
          roomMonth: startMonth,
          deposit: deposit,
          monthly: monthly,
          options: selectedOption,
          doc: doc,
          lat: addressL.lat,
          lng: addressL.lng,
          address: addressL.address,
          detail: detailAddress,
        },
        {
          withCredentials: true,
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['readUserInfo']) // queryKey 유효성 제거
        setDataSuccess(true)
        if (imgSuccess) setIsModify(false)
      },
    },
  )

  const modifyRoomReleaseImg = useMutation(
    () =>
      axios.post('http://localhost:3001/releaseRoom/uploadImgs', formOutData, {
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['readUserInfo']) // queryKey 유효성 제거
        setImgSuccess(true)
        if (dataSuccess) setIsModify(false)
      },
    },
  )

  useEffect(() => {
    setNowImage(inputImages[0])
  }, [inputImages])

  return (
    <Sform>
      <hr />
      <SInfoMain>
        <SInfoLeft>
          <SMainImg src={`${inputImages[0]}`} alt={'미입력'} />
        </SInfoLeft>
        <SInfoRight>
          <div>
            가격 :{' '}
            <SPayInput
              placeholder="보증금"
              value={deposit}
              onChange={(e) => {
                setDeposit(e.target.value)
              }}
            />{' '}
            /{' '}
            <SPayInput
              placeholder="월세"
              value={monthly}
              onChange={(e) => {
                setMonthly(e.target.value)
              }}
            />
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
          </div>
          <SAddDiv>
            주소검색 : <AddressSelect />
          </SAddDiv>
          <div>
            주소 : <SAddressInput value={addressL.address} />
          </div>
          <div>
            상세주소 :{' '}
            <SAddressInput
              value={detailAddress}
              onChange={(e) => {
                setDetailAddress(e.target.value)
              }}
            />
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
        <SPictureView src={`${nowImage}`} />
        <SPictureLists>
          <SPictureList>
            <SImageLabel htmlFor="imageInput">
              <span>이미지 추가+</span>
            </SImageLabel>
            <SImageInput
              id="imageInput"
              type="file"
              multiple
              onChange={(e) => {
                handleChangeFile(e)
              }}
            />
          </SPictureList>
          {inputImages.map((data, i) => (
            <SPictureList
              key={i}
              onClick={() => {
                setNowImage(data)
              }}
            >
              <SInnerPicture key={i} src={`${data}`} alt={'미입력'} />
            </SPictureList>
          ))}
        </SPictureLists>
      </SPictures>
      <hr />
      <SContent
        placeholder="추가 내용"
        value={doc}
        onChange={(e) => {
          setDoc(e.target.value)
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          if (!(deposit && monthly && year && monthly && detailAddress))
            alert('공란이 있습니다.')
          else {
            modifyRoomRelease.mutate()
            modifyRoomReleaseImg.mutate()
          }
        }}
      >
        저장
      </button>
    </Sform>
  )
}

export default ReleaseRoomModify

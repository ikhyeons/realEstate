import React, { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import styled from 'styled-components'
import Button from '@mui/material/Button'

import {
  AModifyData,
  AModifyStep,
  ARIsModify,
} from '../../../../../../AtomStorage'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import Port from '../../../../../../../port'

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

const Modify2 = () => {
  const nextPrevBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '5px',
    width: '78px',
    background: '#ee5',
    '&:hover': { background: '#dd2' },
  }

  const [, setModifyStep] = useRecoilState(AModifyStep)
  const [imgSuccess, setImgSuccess] = useState(false)
  const [dataSuccess, setDataSuccess] = useState(false)
  const [, setIsModify] = useRecoilState(ARIsModify)
  const queryClient = useQueryClient() // 등록된 quieryClient 가져오기
  const rstModifyData = useResetRecoilState(AModifyData)
  const modifyRoomRelease = useMutation<mutationData>(
    () =>
      axios.post(`http://${Port}/releaseRoom/setRoomContent`, modifyData, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['readUserInfo']) // queryKey 유효성 제거
        setDataSuccess(true)
        if (imgSuccess) setIsModify(false)
      },
    },
  )

  const modifyRoomReleaseImg = useMutation<mutationData>(
    () =>
      axios.post(
        `http://${Port}/releaseRoom/uploadImgs`,
        modifyData.formOutData,
        {
          headers: { 'content-type': 'multipart/form-data' },
          withCredentials: true,
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['readUserInfo']) // queryKey 유효성 제거
        setImgSuccess(true)
        if (dataSuccess) setIsModify(false)
      },
    },
  )

  const [nowImage, setNowImage] = useState<string>('')
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
          setModifyData((prev) => {
            if (!prev.inputImages.includes(resultImage)) {
              return {
                ...prev,
                inputImages: [...prev.inputImages, resultImage],
              }
            } else {
              return { ...prev }
            }
          })
        }
        setModifyData((prev) => ({ ...prev, formOutData: form }))
      })
    }
  }

  const [modifyData, setModifyData] = useRecoilState(AModifyData)

  useEffect(() => {
    setNowImage(modifyData.inputImages[0])
  }, [modifyData.inputImages])

  useEffect(() => {
    console.log(modifyData)
  }, [modifyData])

  return (
    <>
      <hr />
      <SPictures>
        {<SPictureView src={`${nowImage}`} />}
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
          {modifyData.inputImages.map((data, i) => (
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
        value={modifyData.doc}
        onChange={(e) => {
          setModifyData((prev) => ({ ...prev, doc: e.target.value }))
        }}
      />
      <Button
        disabled={false} /*버튼 작동, 미작동 설정*/
        sx={nextPrevBtn}
        size="large"
        variant="contained" /*버튼 모양 결정*/
        onClick={() => {
          setModifyStep('first')
        }}
      >
        이전
      </Button>
      <Button
        disabled={false} /*버튼 작동, 미작동 설정*/
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginRight: '5px',
          width: '78px',
          color: 'green',
          background: '#ee5',
          '&:hover': { background: '#dd2' },
        }}
        size="large"
        variant="contained" /*버튼 모양 결정*/
        onClick={(e) => {
          e.preventDefault()
          if (
            !(
              modifyData.deposit &&
              modifyData.monthly &&
              modifyData.startMonth &&
              modifyData.startYear &&
              modifyData.addressL.address &&
              modifyData.detailAddress
            )
          )
            alert('공란이 있습니다.')
          else {
            modifyRoomRelease.mutate()
            modifyRoomReleaseImg.mutate()
          }
        }}
      >
        완료
      </Button>
      <Button
        disabled={false} /*버튼 작동, 미작동 설정*/
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginLeft: '15px',
          width: '78px',
          background: '#ee5',
          '&:hover': { background: '#dd2' },
        }}
        size="large"
        variant="contained" /*버튼 모양 결정*/
        onClick={(e) => {
          setIsModify(false)
          rstModifyData()
          setModifyStep('first')
        }}
      >
        취소
      </Button>
    </>
  )
}

export default Modify2

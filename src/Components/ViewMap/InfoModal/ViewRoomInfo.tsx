import styled from 'styled-components'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { AcurrentRoomId } from '../../../AtomStorage'
import { useState } from 'react'

const SInfoMain = styled.div`
  margin-top: 5px;
  margin-bottom: 2px;
  display: flex;
`
const SInfoLeft = styled.div`
  width: 30%;
  margin-right: 5px;
`
const SMainImg = styled.img`
  width: 100%;
`
const SInfoRight = styled.div`
  width: 40%;
`
const SPictures = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`
const SPictureView = styled.img`
  height: 450px;
  width: 100%;
`
const SPictureList = styled.ol`
  display: flex;
  height: 100px;
`
const SPictureLists = styled.li`
  list-style: none;
  height: 100%;
  margin-right: 5px;
`
const SInnerPicture = styled.img`
  height: 100%;
`

const SContent = styled.div``

const ViewRoomInfo = () => {
  const [currentRoomId, setCurrentRoomId] = useRecoilState(AcurrentRoomId)
  const [currentImg, setCurrentImg] = useState<string>('')
  const { status, error, data, refetch } = useQuery(
    ['readRoomInfo'],
    (data) =>
      axios.get(`http://localhost:3001/user/readRoomInfo/${currentRoomId}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data: any) => {
        console.log(data.data.data[0], data.data.imgs)
        setCurrentImg(data.data.imgs[0].pictureAddress)
      },
    },
  )
  return (
    <>
      <hr />
      <SInfoMain>
        <SInfoLeft>
          {data ? (
            <SMainImg
              src={`http://localhost:3001/releaseRoom/readImg/${data?.data.imgs[0].pictureAddress}`}
            />
          ) : null}
        </SInfoLeft>
        <SInfoRight>
          <p>기간 : {data?.data.data[0].roomDate} 부터</p>
          <p>
            보증금/월세 : {data?.data.data[0].roomDeposit} /{' '}
            {data?.data.data[0].roomMonthly}
          </p>
          <p>
            주소 :{' '}
            {data?.data.data[0].roomAddress +
              ' ' +
              data?.data.data[0].roomDetailAddress}
          </p>
          <p>옵션 : </p>
        </SInfoRight>
      </SInfoMain>
      <hr />
      <SPictures>
        {currentImg ? (
          <SPictureView
            src={`http://localhost:3001/releaseRoom/readImg/${currentImg}`}
          />
        ) : null}
        <SPictureList>
          {data?.data.imgs.map((data: any, i: number) => (
            <SPictureLists
              key={i}
              onClick={() => {
                setCurrentImg(data.pictureAddress)
              }}
            >
              {data ? (
                <SInnerPicture
                  src={`http://localhost:3001/releaseRoom/readImg/${data.pictureAddress}`}
                />
              ) : null}
            </SPictureLists>
          ))}
        </SPictureList>
      </SPictures>
      <hr />
      <SContent>{data?.data.data[0].roomDoc}</SContent>
    </>
  )
}

export default ViewRoomInfo

import styled from 'styled-components'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { AcurrentImg } from '../../../../../AtomStorage'

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
  width: 40%;
`
const SPictures = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`
const SPictureView = styled.img`
  height: 400px;
  width: 100%;
`
const SPictureList = styled.ol`
  display: flex;
  height: 100px;
`
const SPictureLists = styled.li`
  height: 100%;
  margin-right: 5px;
  list-style: none;
`
const SInnerPicture = styled.img`
  height: 100%;
  width: 200px;
`

const SContent = styled.div``

const ReleaseRoomTrue = () => {
  const [currentImg, setCurrentImg] = useRecoilState(AcurrentImg)

  const { status, error, data, refetch } = useQuery(
    ['readUserInfo'],
    () =>
      axios.get(`http://localhost:3001/user/readUserInfo`, {
        withCredentials: true,
      }),
    {
      enabled: false,
    },
  )

  return (
    <>
      <hr />
      <SInfoMain>
        <SInfoLeft>
          <SMainImg
            src={
              data
                ? `http://localhost:3001/releaseRoom/readImg/${data?.data.imgs[0].pictureAddress}`
                : undefined
            }
            alt="대체 텍스트"
          />
        </SInfoLeft>
        <SInfoRight>
          <p>{`기간 : ${data?.data.data[0].roomDate + ' 부터' || '미입력'}`}</p>
          <p>{`가격 : ${
            data?.data.data[0].roomDeposit +
              '/' +
              data?.data.data[0].roomMonthly || '미입력'
          }`}</p>
          <p>{`주소 : ${
            data?.data.data[0].roomAddress +
              ' ' +
              data?.data.data[0].roomDetailAddress || '미입력'
          }`}</p>
          <p>{`옵션 : ${data?.data.data[0].roomOption || '미입력'}`}</p>
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
            <SPictureLists key={i}>
              {data ? (
                <SInnerPicture
                  onClick={() => {
                    setCurrentImg(data.pictureAddress)
                  }}
                  src={`http://localhost:3001/releaseRoom/readImg/${data.pictureAddress}`}
                />
              ) : null}
            </SPictureLists>
          ))}
        </SPictureList>
      </SPictures>
      <hr />
      <SContent>{data?.data.data[0].roomDoc || ''}</SContent>
    </>
  )
}

export default ReleaseRoomTrue

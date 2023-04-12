import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { AcurrentRoomId } from "../../../AtomStorage";
import { useState } from "react";
import Port from "../../../../port";

const SInfoMain = styled.div`
  margin-top: 5px;
  margin-bottom: 2px;
  display: flex;
`;
const SInfo = styled.div``;
const SPictures = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SPictureViewWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  background: black;
`;

const SPictureView = styled.img`
  height: 450px;
`;
const SPictureList = styled.ol`
  display: flex;
  height: 100px;
`;
const SPictureLists = styled.li`
  list-style: none;
  height: 100%;
  margin-right: 5px;
`;
const SInnerPicture = styled.img`
  height: 100%;
`;

const SContent = styled.div``;

const ViewRoomInfo = () => {
<<<<<<< HEAD
  const [currentRoomId] = useRecoilState(AcurrentRoomId)
  const [currentImg, setCurrentImg] = useState<string>('')
  const { status, error, data, refetch } = useQuery<IRoomInfo>(
    ['readRoomInfo', currentRoomId],
    () => axios.get(`http://${Port}/user/readRoomInfo/${currentRoomId}`),
    {
      onSuccess: (data) => {
        setCurrentImg(data.data.imgs[0].pictureAddress)
=======
  const [currentRoomId, setCurrentRoomId] = useRecoilState(AcurrentRoomId);
  const [currentImg, setCurrentImg] = useState<string>("");
  const { status, error, data, refetch } = useQuery(
    ["readRoomInfo", currentRoomId],
    (data) => axios.get(`http://${Port}/user/readRoomInfo/${currentRoomId}`),
    {
      onSuccess: (data: any) => {
        setCurrentImg(data.data.imgs[0].pictureAddress);
>>>>>>> 839a10f1d4ba630b3548bd737183ffbde2fb724a
      },
    }
  );
  return (
    <>
      <hr />
      <SInfoMain>
        <SInfo>
          <p>기간 : {data?.data.data[0].roomDate} 부터</p>
          <p>
            보증금/월세 : {data?.data.data[0].roomDeposit} /{" "}
            {data?.data.data[0].roomMonthly}
          </p>
          <p>
            주소 :{" "}
            {data?.data.data[0].roomAddress +
              " " +
              data?.data.data[0].roomDetailAddress}
          </p>
          <p>
<<<<<<< HEAD
            옵션 :{' '}
            {data?.data.options.map((data, i: number) => (
              <span key={i}>{data.roomOption + ' '}</span>
=======
            옵션 :{" "}
            {data?.data.options.map((data: any, i: number) => (
              <span key={i}>{data.roomOption + " "}</span>
>>>>>>> 839a10f1d4ba630b3548bd737183ffbde2fb724a
            ))}
          </p>
        </SInfo>
      </SInfoMain>
      <hr />
      <SPictures>
        <SPictureViewWrap>
          {currentImg ? (
            <SPictureView
              src={`http://${Port}/releaseRoom/readImg/${currentImg}`}
            />
          ) : null}
        </SPictureViewWrap>
        <SPictureList>
          {data?.data.imgs.map((data, i: number) => (
            <SPictureLists
              key={i}
              onClick={() => {
                setCurrentImg(data.pictureAddress);
              }}
            >
              {data.pictureAddress ? (
                <SInnerPicture
                  src={`http://${Port}/releaseRoom/readImg/${data.pictureAddress}`}
                />
              ) : null}
            </SPictureLists>
          ))}
        </SPictureList>
      </SPictures>
      <hr />
      <SContent>{data?.data.data[0].roomDoc}</SContent>
    </>
  );
};

export default ViewRoomInfo;

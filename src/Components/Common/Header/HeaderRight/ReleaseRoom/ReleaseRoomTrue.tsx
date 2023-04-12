import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import Port from "../../../../../../port";
import { useRecoilState } from "recoil";
import { AcurrentImg } from "../../../../../AtomStorage";

const SInfoMain = styled.div`
  margin-top: 5px;
  margin-bottom: 2px;
  display: flex;
`;
const SInfoRight = styled.div`
  width: 80%;
`;
const SPictures = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;
const SPictureViewWrap = styled.div`
  height: 400px;
  width: 100%;
  background: black;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const SPictureView = styled.img`
  height: 400px;
`;
const SPictureList = styled.ol`
  display: flex;
  height: 100px;
`;
const SPictureLists = styled.li`
  height: 100%;
  margin-right: 5px;
  list-style: none;
`;
const SInnerPicture = styled.img`
  height: 100%;
  width: 100px;
`;

const SContent = styled.div``;

const ReleaseRoomTrue = () => {
  const [currentImg, setCurrentImg] = useRecoilState(AcurrentImg);

  const { status, error, data, refetch } = useQuery<headerUserInfo>(
    ["readUserInfo"],
    () =>
      axios.get(`http://${Port}/user/readUserInfo`, {
        withCredentials: true,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log(data.data);
        console.log("gdgd");
      },
    }
  );

  return (
    <>
      <hr />
      <SInfoMain>
        <SInfoRight>
          <p>{`기간 : ${data?.data.data[0].roomDate + " 부터" || "미입력"}`}</p>
          <p>{`가격 : ${
            data?.data.data[0].roomDeposit +
              "/" +
              data?.data.data[0].roomMonthly || "미입력"
          }`}</p>
          <p>{`주소 : ${
            data?.data.data[0].roomAddress +
              " " +
              data?.data.data[0].roomDetailAddress || "미입력"
          }`}</p>
          <p>{`옵션 : ${data?.data.data[0].roomOption || "미입력"}`}</p>
        </SInfoRight>
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
          {data?.data.imgs.map((data: any, i: number) => (
            <SPictureLists key={i}>
              {data.pictureAddress ? (
                <SInnerPicture
                  onClick={() => {
                    setCurrentImg(data.pictureAddress);
                  }}
                  src={`http://${Port}/releaseRoom/readImg/${data.pictureAddress}`}
                />
              ) : null}
            </SPictureLists>
          ))}
        </SPictureList>
      </SPictures>
      <hr />
      <SContent>{data?.data.data[0].roomDoc || ""}</SContent>
    </>
  );
};

export default ReleaseRoomTrue;

import React, { useState } from "react";
import styled from "styled-components";
import SideListCard from "./SideListCard";
import { useQuery } from "react-query";
import axios from "axios";
import Port from "../../../port";
import { useCookies } from "react-cookie";

const SSideList = styled.ul`
  position: absolute;
  z-index: 2;
  width: 23%;
  min-width: 440px;
  height: calc(100vh - 60px);
  background: rgba(255, 255, 255, 0.83);

  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: none;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffdf65;
  }
  &::-webkit-scrollbar-track {
    background: #bbaa99;
  }
`;

<<<<<<< HEAD
const SideList = () => {
  const [cookies] = useCookies(['isLogin'])
=======
const SideList: React.FC = () => {
  const [cookies, setCookies] = useCookies(["isLogin"]);
>>>>>>> 839a10f1d4ba630b3548bd737183ffbde2fb724a

  const [list, setList] = useState<ISidebarCard[]>([
    {
<<<<<<< HEAD
      id: 0,
      value: '',
      location: '',
      content: '',
      date: '',
      pictureAddress: '',
=======
      id: 1,
      value: "10000/250",
      location: "진주시 칠암동",
      content: "우리집 너무 이쁘죠1",
      date: "",
      pictureAddress: "",
>>>>>>> 839a10f1d4ba630b3548bd737183ffbde2fb724a
      options: [],
    },
  ]);

<<<<<<< HEAD
  const readRooms = useQuery<IroomData>(
    ['readRooms', cookies],
    () => axios.get(`http://${Port}/user/readRooms`, { withCredentials: true }),
    {
      onSuccess: (data) => {
        setList((prev) =>
          data.data.data.map((data, i: number) => ({
=======
  const readRooms = useQuery(
    ["readRooms", cookies],
    () => axios.get(`http://${Port}/user/readRooms`, { withCredentials: true }),
    {
      onSuccess: (data: any) => {
        console.log(data);
        setList((prev: any) =>
          data.data.data.map((data: any, i: number) => ({
>>>>>>> 839a10f1d4ba630b3548bd737183ffbde2fb724a
            id: data.userNum,
            value: `${data.roomDeposit + "/" + data.roomMonthly}`,
            location: `${data.roomAddress + " " + data.roomDetailAddress}`,
            content: data.roomDoc,
            date: data.roomDate,
            pictureAddress: data.roomPicture,
<<<<<<< HEAD
            options: data.roomOption,
          })),
        )
=======
            option: data.roomOption,
          }))
        );
>>>>>>> 839a10f1d4ba630b3548bd737183ffbde2fb724a
      },
    }
  );

  return (
    <SSideList>
      {list.map((value, i) => (
        <SideListCard key={i} data={value} />
      ))}
    </SSideList>
  );
};

export default SideList;

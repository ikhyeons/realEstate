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

const SideList = () => {
  const [cookies] = useCookies(["isLogin"]);

  const [list, setList] = useState<ISidebarCard[]>([
    {
      id: 0,
      value: "",
      location: "",
      content: "",
      date: "",
      pictureAddress: "",
      options: [],
    },
  ]);

  const readRooms = useQuery<IroomData>(
    ["readRooms", cookies],
    () => axios.get(`http://${Port}/user/readRooms`, { withCredentials: true }),
    {
      onSuccess: (data) => {
        setList((prev) =>
          data.data.data.map((data, i: number) => ({
            id: data.userNum,
            value: `${data.roomDeposit + "/" + data.roomMonthly}`,
            location: `${data.roomAddress + " " + data.roomDetailAddress}`,
            content: data.roomDoc,
            date: data.roomDate,
            pictureAddress: data.roomPicture,
            options: data.roomOption,
          }))
        );
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

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import SideListCard from "./SideListCard";
import { useQuery } from "react-query";
import axios from "axios";
import Port from "../../../port";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { AMapAria, AoptionFilter, AroomToggle } from "../../AtomStorage";

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
  const isContainFilterOptions = (
    selectedOptions: string[],
    roomOptions: string[]
  ) => {
    return !selectedOptions
      .map((data, i) => roomOptions.includes(data))
      .includes(false);
  };

  const compareDateWithStandardf = (
    needYear: number,
    roomYear: number,
    needMonth: number,
    roomMonth: number
  ) => {
    console.log(needYear, roomYear, needMonth, roomMonth);
    if ((needYear == roomYear && needMonth >= roomMonth) || needYear > roomYear)
      return false;
    else return true;
  };

  const [optionFilter, setOptionFilter] = useRecoilState(AoptionFilter);
  const [cookies] = useCookies(["isLogin"]);
  const [roomToggle, setRoomToggle] = useRecoilState(AroomToggle);
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

  const [mapAria, setMapAria] = useRecoilState(AMapAria);
  const readRooms = useQuery<IroomData>(
    ["readRooms", cookies, roomToggle, optionFilter, mapAria],
    () => axios.get(`http://${Port}/user/readRooms`, { withCredentials: true }),
    {
      onSuccess: (data) => {
        console.log(data);
        setList(() =>
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
      select: (data) => {
        const onAriaData: IroomData = {
          ...data,
          data: {
            ...data.data,
            data: data.data.data.filter((data, i) => {
              if (
                mapAria.ne.lat > data.roomLat &&
                mapAria.sw.lat < data.roomLat &&
                mapAria.ne.lng > data.roomLng &&
                mapAria.sw.lng < data.roomLng
              )
                return true;
              else return false;
            }),
          },
        };
        switch (roomToggle) {
          case 0:
            return {
              ...onAriaData,
              data: {
                ...onAriaData.data,
                data: onAriaData.data.data.filter((data) =>
                  optionFilter.optionOn === true
                    ? compareDateWithStandardf(
                        optionFilter.year!,
                        Number(data.roomDate.split(".")[0]),
                        optionFilter.month!,
                        Number(data.roomDate.split(".")[1])
                      ) &&
                      isContainFilterOptions(
                        optionFilter.additional!,
                        data.roomOption
                      )
                    : data
                ),
              },
            };

          case 1:
            return {
              ...onAriaData,
              data: {
                ...onAriaData.data,
                data: onAriaData.data.data.filter((data) =>
                  optionFilter.optionOn === true
                    ? data.roomOption.includes("원룸") &&
                      compareDateWithStandardf(
                        optionFilter.year!,
                        Number(data.roomDate.split(".")[0]),
                        optionFilter.month!,
                        Number(data.roomDate.split(".")[1])
                      ) &&
                      isContainFilterOptions(
                        optionFilter.additional!,
                        data.roomOption
                      )
                    : data.roomOption.includes("원룸")
                ),
              },
            };

          default:
            return {
              ...onAriaData,
              data: {
                ...onAriaData.data,
                data: onAriaData.data.data.filter((data) =>
                  optionFilter.optionOn === true
                    ? data.roomOption.includes("투룸") &&
                      compareDateWithStandardf(
                        optionFilter.year!,
                        Number(data.roomDate.split(".")[0]),
                        optionFilter.month!,
                        Number(data.roomDate.split(".")[1])
                      ) &&
                      isContainFilterOptions(
                        optionFilter.additional!,
                        data.roomOption
                      )
                    : data.roomOption.includes("투룸")
                ),
              },
            };
        }
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

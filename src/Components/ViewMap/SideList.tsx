import React, { useState } from 'react'
import styled from 'styled-components'
import SideListCard from './SideListCard'
import { useQuery } from 'react-query'
import axios from 'axios'
import Port from '../../../port'
import { useCookies } from 'react-cookie'

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
`

const SideList: React.FC = () => {
  const [cookies, setCookies] = useCookies(['isLogin'])

  const [list, setList] = useState<CardPropsState[]>([
    {
      id: 1,
      value: '10000/250',
      location: '진주시 칠암동',
      content: '우리집 너무 이쁘죠1',
      date: '',
      pictureAddress: '',
      options: [],
    },
  ])

  const readRooms = useQuery(
    ['readRooms', cookies],
    () => axios.get(`http://${Port}/user/readRooms`, { withCredentials: true }),
    {
      onSuccess: (data: any) => {
        console.log(data.data.data)
        setList((prev: any) =>
          data.data.data.map((data: any, i: number) => ({
            id: data.userNum,
            value: `${data.roomDeposit + '/' + data.roomMonthly}`,
            location: `${data.roomAddress + ' ' + data.roomDetailAddress}`,
            content: data.roomDoc,
            date: data.roomDate,
            pictureAddress: data.roomPicture,
            option: data.roomOption,
          })),
        )
      },
    },
  )

  return (
    <SSideList>
      {list.map((value, i) => (
        <SideListCard key={i} data={value} />
      ))}
    </SSideList>
  )
}

export default SideList

import React, { useState } from 'react'
import styled from 'styled-components'
import SideListCard from './SideListCard'

const SSideList = styled.ul`
  position: fixed;
  z-index: 2;
  padding: 0px 0;
  width: 21%;
  min-width: 375px;
  height: 93%;
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
  const [list, setList] = useState<CardPropsState[]>([
    {
      id: 1,
      value: '10000/250',
      location: '진주시 칠암동',
      content: '우리집 너무 이쁘죠1',
      period: {
        start: '22.12',
        end: '23.02',
      },
    },
    {
      id: 2,
      value: '10000/200',
      location: '진주시 칠암동',
      content: '우리집 너무 이쁘죠2',
      period: {
        start: '22.12',
        end: '23.02',
      },
    },
    {
      id: 3,
      value: '10000/150',
      location: '진주시 칠암동',
      content: '우리집 너무 이쁘죠3',
      period: {
        start: '22.12',
        end: '23.02',
      },
    },
  ])
  return (
    <SSideList>
      {list.map((value, i) => (
        <SideListCard key={i} data={value} />
      ))}
    </SSideList>
  )
}

export default SideList

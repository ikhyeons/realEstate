import React, { useState } from 'react'
import Header from '../Components/Common/Header/Header'
import styled from 'styled-components'
import InfoInputPage from '../Components/JoinPage/InfoInputPage'
import { useRecoilState } from 'recoil'
import { joinPageNum } from '../AtomStorage'
import Tos from '../Components/JoinPage/Tos'

const SJoin = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 93vh;
  margin-top: 7vh;
  align-items: center;
`

const JoinPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useRecoilState<0 | 1>(joinPageNum)

  return (
    <>
      <Header />
      <SJoin>{currentPage === 1 ? <InfoInputPage /> : <Tos />}</SJoin>
    </>
  )
}

export default JoinPage

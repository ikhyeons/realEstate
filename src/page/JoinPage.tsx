import React, { useState } from 'react'
import Header from '../Components/Common/Header/Header'
import styled from 'styled-components'
import InfoInputPage from '../Components/JoinPage/InfoInputPage'
import { useRecoilState } from 'recoil'
import { AjoinPageNum } from '../AtomStorage'
import Tos from '../Components/JoinPage/Tos'

const SJoin = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  align-items: center;
`

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const JoinPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useRecoilState<0 | 1>(AjoinPageNum)

  return (
    <SWrap>
      <Header />
      <SJoin>{currentPage === 1 ? <InfoInputPage /> : <Tos />}</SJoin>
    </SWrap>
  )
}

export default JoinPage

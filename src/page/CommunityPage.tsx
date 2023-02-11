import React, { useState } from 'react'
import Header from '../Components/Common/Header/Header'
import styled from 'styled-components'
import DocList from '../Components/CommunityPage/DocList'
import DocView from '../Components/CommunityPage/DocView'
import DocWrite from '../Components/CommunityPage/DocWrite'
import { Route, Routes } from 'react-router-dom'

const SCommunity = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  overflow: hidden;
`

const Smain = styled.div`
  margin: 0 auto;
  padding: 5px;
  width: 50%;
  min-width: 750px;
  height: 100%;
  background: rgb(248, 248, 246);
  border-left: 1px solid black;
  border-right: 1px solid black;
  position: relative;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ee8;
  }
`
const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const CommunityPage: React.FC = () => {
  return (
    <SWrap>
      <Header />
      <SCommunity>
        <Smain>
          <Routes>
            <Route path="/List/:pageNum" element={<DocList />} />
            <Route path="/List/" element={<DocList />} />
            <Route path="/View/:docNum" element={<DocView />} />
            <Route path="/Write" element={<DocWrite />} />
          </Routes>
        </Smain>
      </SCommunity>
    </SWrap>
  )
}

export default CommunityPage

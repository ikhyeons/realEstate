import React, { useState } from 'react'
import Header from '../Components/Common/Header/Header'
import styled from 'styled-components'
import DocList from '../Components/CommunityPage/DocList'
import DocView from '../Components/CommunityPage/DocView'
import DocWrite from '../Components/CommunityPage/DocWrite'

const SCommunity = styled.div`
  display: flex;
  width: 100vw;
  height: 93vh;
  margin-top: max(7vh, 60px);
  overflow: hidden;
`

const Smain = styled.div`
  margin: 0 auto;
  padding: 5px;
  width: 50%;
  height: 100%;
  background: rgb(248, 248, 246);
  border-left: 1px solid black;
  border-right: 1px solid black;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ee8;
  }
`

const CommunityPage: React.FC = () => {
  const [docState, setDocState] = useState<'LIST' | 'VIEW' | 'WRITE'>('LIST')
  return (
    <>
      <Header />
      <SCommunity>
        <Smain>
          {docState === 'LIST' && <DocList />}
          {docState === 'VIEW' && <DocView />}
          {docState === 'WRITE' && <DocWrite />}
        </Smain>
      </SCommunity>
    </>
  )
}

export default CommunityPage
